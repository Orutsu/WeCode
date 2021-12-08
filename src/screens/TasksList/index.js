import React, {useEffect, useState} from "react";
import DefaultText from "../../components/DefaultText";
import Header from "../../components/Header";
import './style.css';
import {useDispatch} from 'react-redux'
import HeaderText from "../../components/HeaderText";
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusSquare } from 'react-icons/fa';
import { useTypedSelector } from "../../redux/store";
import { getAllTasks, getUserCreatedTasks } from "../../services/TaskService";
import { setTaskIdToComplete } from "../../redux/auth";

const TasksListScreen = () => {
    const {user, isAdmin} = useTypedSelector((store) => store.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [tasksToShow, setTasksToShow] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onTaskCardClick = (taskId) => {
        dispatch(setTaskIdToComplete(taskId))
        if (!isAdmin) {
            navigate('/completingtask', { replace: false })
        } else {
            // edit task screen
        }
    }

    const getTask = async () => {
        setIsLoading(true)
        let tasks = []
        const allTasks = await getAllTasks()
        tasks = allTasks
        setTasksToShow(tasks)
        setIsLoading(false)
        return tasks
    }

    useEffect(() => {
        console.log('isAdmin', isAdmin)
        console.log('user', user)
        getTask()
    }, [])

    const onAddNewTaskClick = () => {
        navigate('/createtask', { replace: false })
    }

    const onEditTaskClick = (e) => {
        e.stopPropagation();
        console.log('Edit') 
    }
    
    const TaskCard = ({id, name, description, complexity, score}) => {
        let descriptionWidth = isAdmin? "65%" : "50%";
        return (
            <div className="TaskCard" onClick={() => onTaskCardClick(id)} style={{padding: 20, paddingTop: 30, marginBottom: 20}}>          
                <HeaderText fontSize={36} style={{paddingRight: 20, width: "25%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{name}</HeaderText>
                <DefaultText fontSize={18} style={{paddingRight: 50, paddingTop: 15, width: descriptionWidth,  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{description}</DefaultText>
                {isAdmin 
                    ? <div onClick={onEditTaskClick}><HeaderText fontSize={18} style={{paddingTop: 15}} >Edit</HeaderText></div> // How to press something in link??? Move edit somewhere outside link
                    : <DefaultText fontSize={18} style={{paddingTop: 15}}>Complexity: {complexity}</DefaultText>
                }
                {!isAdmin && 
                    <DefaultText fontSize={18} style={{paddingLeft: 25, paddingTop: 15}}>Score: {score}</DefaultText>
                }
            </div>
        )
    }

    const listItems = tasksToShow.map((task, index) => <TaskCard id={index} isAdmin name={task.title}  description={task.description} complexity={task.difficulty} score={task.score}/>);

    return (
        <div className="TasksListContainer">
            <Header />
            <div style={{paddingLeft: 150, paddingRight: 150}}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: "stretch"}}> 
                        <HeaderText fontSize={50} style={{paddingTop: 50, paddingBottom: 20}}>Coding</HeaderText>
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: "space-between"}}>
                            {isAdmin 
                                ? <DefaultText fontSize={36} style={{paddingBottom: 20}}>All tasks</DefaultText>
                                : <DefaultText fontSize={36} style={{paddingBottom: 20}}>Available tasks</DefaultText>
                            }
                            
                            {isAdmin &&
                                <Link to='/createtask' style = {{color: "inherit", textDecoration: "inherit"}} >      
                                    <DefaultText fontSize={36} style={{paddingBottom: 20, userSelect: "none" }}>Add new <FaPlusSquare size="22" /></DefaultText>
                                </Link>
                            }
                        </div>
                        {listItems}
                </div>
            </div>
        </div>
    );  
}

export default TasksListScreen
  