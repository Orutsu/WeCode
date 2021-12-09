import React, {useState, useEffect} from "react";
import DefaultText from "../../components/DefaultText";
import HeaderText from "../../components/HeaderText";
import Header from "../../components/Header";
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { getAllCodeBlocks, getCodeBlock, getTaskResult, getTaskWithCodeBlocks, submitTask } from "../../services/TaskService";
import DefaultButton from '../../components/DefaultButton'
import { useTypedSelector } from "../../redux/store";

const CompletedTaskScreen = () => {
    
    const navigate = useNavigate()
    const [taskInfo, setTaskInfo] = useState({})
    const { taskResultIdToWatch} = useTypedSelector((store) => store.auth)

    const [blocksArray, setBlocksArray] = useState([])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const taskResulInfoWithActualResults = await getTaskResult(taskResultIdToWatch);
        const codeBlocks = await getAllCodeBlocks();

        const taskResultMapped = {
            name : taskResulInfoWithActualResults.task.title, 
            description : taskResulInfoWithActualResults.task.description,
            complexity : taskResulInfoWithActualResults.task.difficulty,
            score: taskResulInfoWithActualResults.taskResult.score,
            blocks: taskResulInfoWithActualResults.actualResults?.map((actualResult) => {
                 return {id : actualResult.codeBlockId, text : (codeBlocks.find(block => block.codeBlockId === actualResult.codeBlockId)).code};
                })
        };

        setTaskInfo(taskResultMapped);
        console.log('taskInfo', taskInfo);
    
        setBlocksArray(taskResultMapped.blocks);
        console.log('setBlocksArray', blocksArray);
      }, []);



    const Block = ({block}) => {
        return (
            <div  className="Block"  style={{ width: '85%', paddingTop: 10, paddingBottom: 10, marginBottom: 20, alignItems: "center"}}>          
                <DefaultText  fontSize={28} style = {{ textAlign: 'center', userSelect: "none", width: '90%'}}>{block.text}</DefaultText>
            </div>
        )
    };   

    function onClose() {
        navigate('/usercabinet', { replace: false })
    }

    return (
        <div className="CompletedTaskScreen">
            <Header />
            <div style={{marginTop: 50, paddingLeft: 100, paddingRight: 100, display: 'flex', flex: 1, flexDirection: 'rows', justifyContent: "space-between", alignItems: 'start'}}>
                <div style={{width: 400}}> 
                </div>


                <div style={{ minHeight: 500, paddingLeft: 25,paddingRight: 25,  width: 400}}> 
                    <HeaderText style={{ height: 70, userSelect: "none"}} fontSize={36}>Solution</HeaderText>
                    <div style = {{border: '10px solid #EDE7D7', borderRadius: 16, paddingTop: 20, display: 'flex', flex: 1, justifyContent:'center'}}>
                        <ul style = {{  width: '90%', minHeight: 300, margin: 0, padding: 0, listStyleType: "none"}} >
                        {blocksArray.map((block, index) => {
                            return (
                                <div style={{width: 400}}key={`${block.id}`} index={index}>
                                    <li >
                                        <div style ={{display: 'flex', flex: 1, flexDirection: 'rows'}}>
                                            <Block   isAvailable = {false} key = {block.id} block={block} />
                                        </div>
                                    </li>
                                </div>
                            );
                        })}
                        </ul>
                    </div>
                </div>


                <div style={{width: 400}}> 
                    <HeaderText style={{ height: 70, userSelect: "none"}} fontSize={36}>Task description</HeaderText>
                    <DefaultText style={{ marginBottom: 5, userSelect: "none"}} fontSize={28}>Name: {taskInfo.name}</DefaultText>
                    <DefaultText style={{ marginBottom: 5,userSelect: "none"}} fontSize={28}>Complexity: {taskInfo.complexity}</DefaultText>
                    <DefaultText style={{ marginBottom: 5,userSelect: "none"}} fontSize={28}>Description: {taskInfo.description}</DefaultText>   
                    <DefaultText style={{ marginBottom: 5,userSelect: "none"}} fontSize={28}>Your score: {`${taskInfo.score}%`}</DefaultText>            
                    <DefaultButton 
                        border="none"    
                        onClick={onClose}
                        value="Close"
                        style={{marginTop: 50}}
                    />
                </div>

                
            </div>
        </div>
    );  
}

export default CompletedTaskScreen
  