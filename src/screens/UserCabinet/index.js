import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import './style.css';
import HeaderText from "../../components/HeaderText";
import DefaultText from "../../components/DefaultText";
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetAuthState, setUser } from "../../redux/auth";
import { changeUserData } from "../../services/UserService";
import { useTypedSelector } from "../../redux/store.ts";
import { getUserCreatedTasks, getUserCompletedTasks, getTask } from "../../services/TaskService";

const UserCabinetScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { isAuth, user, isAdmin } = useTypedSelector((store) => store.auth)
    const [name, setName] = useState(user.name)
    const [surname, setSurname] = useState(user.surname)
    const [email, setEmail] = useState(user.email)
    const [createdTasks, setCreatedtasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    
    const completedTasksAmount = 4;
    const successfullyCompletedTasksAmount = 2;
    const averageMark = "70%";

    useEffect(async () => {
        const createdTasks = (await getUserCreatedTasks(user.userId)).map(task => ({name: task.title, description: task.description, complexity: task.difficulty}));
        console.log('createdTasks', createdTasks);
        setCreatedtasks(createdTasks);
        const userCompletedTasks = await getUserCompletedTasks(user.userId);
        (userCompletedTasks).forEach(async(completedTask) => {
            const task = await getTask(completedTask.taskId); 
            setCompletedTasks (completedTasks.concat(({name: task.title, score: completedTask.score})));
        });
        console.log('completedTasks', completedTasks);
      }, []);

    const onSignOut = () => {
        dispatch(resetAuthState())
        navigate('/signin', { replace: true })
    }

    const CompletedTask = ({name, score}) => {
        return (
            <Link className="CompletedTask"  to= '/completingtask' style={{padding: 10, marginBottom: 20}}>          
                <HeaderText fontSize={28} style={{paddingRight: 20, width: "70%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{name}</HeaderText>
                <DefaultText fontSize={18} style={{paddingTop: 10}}>Score: {score}</DefaultText>
            </Link>
        )
    };

    const CreatedTask = ({name, description, complexity}) => {
        return (
            <Link className="CompletedTask" to= '/editingtask' style={{padding: 10, marginBottom: 20}}>          
                <HeaderText fontSize={28} style={{paddingRight: 20, width: "25%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{name}</HeaderText>
                <DefaultText fontSize={18} style={{paddingRight: 20, paddingTop: 10, width: "55%",  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{description}</DefaultText>
                <DefaultText fontSize={18} style={{paddingTop: 10}}>Complexity: {complexity}</DefaultText>
            </Link>
        )
    };

    const listItems = isAdmin
        ? createdTasks.map((task) => <CreatedTask  name={task.name}  description={task.description} complexity={task.complexity} />)
        : completedTasks.map((task) => <CompletedTask  name={task.name}  score={task.score} />);

    const onChangeUserData = async () => {
        try{
            const userInfo = await changeUserData(user.userId, name, surname, email, null);
            console.log('userInfo', userInfo);
            dispatch(setUser(userInfo))
        }catch(ex)
        {
            alert('Update of user data failed ', ex);
        }
    }

    return (
        <div className="UserCabinetContainer">
            <Header />
            <div style={{marginTop: 50, paddingLeft: 100, paddingRight: 100, display: 'flex', flex: 1, flexDirection: 'rows', justifyContent: "space-between"}}>
                <div style={{width: 350}}> 
                    <HeaderText style={{ height: 70}} fontSize={50}>Profile</HeaderText>
                    <DefaultText fontSize={28}>Name</DefaultText>
                    <DefaultInput style={{marginBottom: 10}} value={name} placeholder="Email" onChange={(text) => {setName(text); onChangeUserData()}} />
                    <DefaultText fontSize={28}>Surname</DefaultText>
                    <DefaultInput style={{marginBottom: 10}} value={surname} placeholder="Email" onChange={(text) => {setSurname(text); onChangeUserData()}} />
                    <DefaultText fontSize={28}>Email</DefaultText>
                    <DefaultInput style={{marginBottom: 10}} value={email} placeholder="Email" onChange={(text) => {setEmail(text);  onChangeUserData()}} />
                    <DefaultButton border="none"    
                        onClick={onChangeUserData}
                        value="Change password"
                        style={{marginTop: 20}}
                    />
                    <DefaultButton border="none"    
                        onClick={onSignOut}
                        value="Sign out"
                        style={{marginTop: 20}}
                    />
                </div>

                {
                    !isAdmin &&
                    <div style={{width: 500}}> 
                        <div style={{ height: 70}} ></div>
                        <DefaultText fontSize={28}>Completed tasks: </DefaultText>
                        {listItems}
                    </div>
                }
                {
                    isAdmin &&
                    <div style={{width: 900}}> 
                        <div style={{ height: 70}} ></div>
                        <DefaultText fontSize={28}>Created tasks: </DefaultText>
                        {listItems}
                    </div>
                }

                {
                    !isAdmin &&
                    <div style={{width: 350}}> 
                        <div style={{ height: 70}} ></div>
                        <DefaultText fontSize={28}>Statistics: </DefaultText>
                        <ul>
                            <li><DefaultText fontSize={28}>Number of completed tasks: <b style={{color: 'rosybrown'}} >{completedTasksAmount}</b></DefaultText></li>
                            <li><DefaultText fontSize={28}>Number of successfully completed tasks: <b style={{color: 'rosybrown'}} >{successfullyCompletedTasksAmount}</b></DefaultText></li>
                            <li><DefaultText fontSize={28}>Average mark: <b style={{color: 'rosybrown'}} >{averageMark}</b></DefaultText></li>
                        </ul>
                    </div>
                }
                
            </div>
        </div>
    );  
}

export default UserCabinetScreen
