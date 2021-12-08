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

const CompletingTaskScreen = ({taskId}) => {
    
    const navigate = useNavigate()
    const [taskInfo, setTaskInfo] = useState({})
    const { taskIdToComplete } = useTypedSelector((store) => store.auth)
    const { isAuth, user, isAdmin } = useTypedSelector((store) => store.auth)
    const [isModalScoreActive, setIsModalScoreActive] = useState(false)
    const [isModalErrorActive, setisModalErrorActive] = useState(false)
    const [score, setScore] = useState(0)
    console.log(taskIdToComplete)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const taskInfoWIthCodeBlocks = await getTaskWithCodeBlocks(taskIdToComplete);
        console.log('task in CompletingTaskScreen', taskInfoWIthCodeBlocks);
        const codeBlocks = await getAllCodeBlocks();
        console.log('codeBlocks', codeBlocks);

        const taskInfoMapped = {
            name : taskInfoWIthCodeBlocks.task.title, 
            description : taskInfoWIthCodeBlocks.task.description,
            complexity : taskInfoWIthCodeBlocks.task.difficulty,
            previousScore: null,
            blocks: taskInfoWIthCodeBlocks.expectedResults?.map((expectedResult) => {
                 return {id : expectedResult.codeBlockId, text : (codeBlocks.find(block => block.codeBlockId === expectedResult.codeBlockId)).code};
                })
        };
        
        shuffle(taskInfoMapped.blocks);

        setTaskInfo(taskInfoMapped);
        console.log('taskInfo', taskInfo);
    
        setBlocksAvailableArray(taskInfoMapped.blocks);
        console.log('blocksAvailableArray', blocksAvailableArray);

        //for task seeing
        const taskResulInfoWithActualResults = await getTaskResult(18);
        console.log('taskResulInfoWithActualResults', taskResulInfoWithActualResults);
        //const codeBlocks = await getAllCodeBlocks();
        console.log('codeBlocks', codeBlocks);

        const taskResultMapped = {
            name : taskResulInfoWithActualResults.task.title, 
            description : taskResulInfoWithActualResults.task.description,
            complexity : taskResulInfoWithActualResults.task.difficulty,
            score: taskResulInfoWithActualResults.taskResult.score,
            blocks: taskResulInfoWithActualResults.actualResults?.map((actualResult) => {
                 return {id : actualResult.codeBlockId, text : (codeBlocks.find(block => block.codeBlockId === actualResult.codeBlockId)).code};
                })
        };
        console.log('taskResultMapped', taskResultMapped);

      }, []);

    const shuffle = (array) => {
       array.sort(() => Math.random() - 0.5);
    }

    const [blocksAvailableArray, setBlocksAvailableArray] = useState([])
    const [blocksUsedArray, setBlocksUsedArray] = useState([])


    const Block = ({block, isAvailable, ...restProps}) => {

        const onAvailableClick = function () {
            let index = -1;
            for(let i = 0; i < blocksAvailableArray.length; ++i) {
                if(blocksAvailableArray[i].id == block.id) {
                    index = i;
                }
            }
            if (index !== -1) {
                blocksAvailableArray.splice(index, 1);
                setBlocksAvailableArray([...blocksAvailableArray]);
                setBlocksUsedArray([...blocksUsedArray, block])
            }
        }

        const onUsedClick = function () {
            let index = -1;
            for(let i = 0; i < blocksUsedArray.length; ++i) {
                if(blocksUsedArray[i].id == block.id) {
                    index = i;
                }
            }
            if (index !== -1) {
                blocksUsedArray.splice(index, 1);
                setBlocksUsedArray([...blocksUsedArray]);
                setBlocksAvailableArray([...blocksAvailableArray, block])
            }
        }

        return (
                <div  className="Block"  onClick={isAvailable? onAvailableClick : null} style={{ width: '100%', paddingTop: 10, paddingBottom: 10, marginBottom: 20, alignItems: "center"}}>          
                    <DefaultText {...restProps} fontSize={28} style = {{ textAlign: 'center', userSelect: "none", width: '90%'}}>{block.text}</DefaultText>
                    { isAvailable
                        ? <FaPlus size="22" />
                        : <FaMinus onClick={!isAvailable? onUsedClick : null} size="22" />
                    }
                </div>
        )
    };   

    function handleOnDragEnd(result){
        if(!result.destination) return;
        const items = Array.from(blocksUsedArray);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBlocksUsedArray(items);
    }

    function onSubmit(){
        if(blocksAvailableArray.length > 0){
            setisModalErrorActive(true)
            return;
        }
        submitTask(user.userId, taskIdToComplete, blocksUsedArray).then(score => {
            setScore(score)
            setIsModalScoreActive(true);
        })
    }
    function onTryAgain(){
        setIsModalScoreActive(false);
    }
    function onExit(){
        setIsModalScoreActive(false);
        navigate('/taskslist', { replace: false });
    }

    function onCloseError(){
        setisModalErrorActive(false);
    }
    return (
        <div className="CompletingTaskContainer">
            <Header />
            <div style={{marginTop: 50, paddingLeft: 100, paddingRight: 100, display: 'flex', flex: 1, flexDirection: 'rows', justifyContent: "space-between", alignItems: 'start'}}>
                <div style={{width: 400}}> 
                    <HeaderText style={{ height: 70, userSelect: "none"}} fontSize={36}>Code blocks</HeaderText>
                    {blocksAvailableArray?.map((block) => <Block isAvailable = {true} key = {block.id} block={block} />)}
                </div>


                <div style={{ minHeight: 500, paddingLeft: 25,paddingRight: 25,  width: 400}}> 
                    <HeaderText style={{ height: 70, userSelect: "none"}} fontSize={36}>Solution</HeaderText>
                    <div style = {{border: '10px solid #EDE7D7', borderRadius: 16, paddingTop: 20, display: 'flex', flex: 1, justifyContent:'center'}}>
                        <DragDropContext  onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="usedBlocks">
                                {(provided) => (
                                    <ul style = {{  width: '90%', minHeight: 300, margin: 0, padding: 0, listStyleType: "none"}}{...provided.droppableProps} ref={provided.innerRef}>
                                    {blocksUsedArray?.map((block, index) => {
                                        return (
                                            <Draggable style={{width: 400}}key={`${block.id}`} draggableId={`${block.id}`} index={index}>
                                                {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} >
                                                    <div style ={{display: 'flex', flex: 1, flexDirection: 'rows'}}>
                                                        <Block  {...provided.dragHandleProps} isAvailable = {false} key = {block.id} block={block} />
                                                    </div>
                                                </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>


                <div style={{width: 400}}> 
                    <HeaderText style={{ height: 70, userSelect: "none"}} fontSize={36}>Task description</HeaderText>
                    <DefaultText style={{ marginBottom: 5, userSelect: "none"}} fontSize={28}>Name: {taskInfo.name}</DefaultText>
                    <DefaultText style={{ marginBottom: 5,userSelect: "none"}} fontSize={28}>Complexity: {taskInfo.complexity}</DefaultText>
                    <DefaultText style={{ marginBottom: 5,userSelect: "none"}} fontSize={28}>Description: {taskInfo.description}</DefaultText>
                    <DefaultText style={{ marginBottom: 5,userSelect: "none"}} fontSize={28}>Previous score: {taskInfo.previousScore}</DefaultText>                
                    <DefaultButton 
                        border="none"    
                        onClick={onSubmit}
                        value="Submit"
                        style={{marginTop: 50}}
                    />
                </div>

                
            </div>
            {
                isModalScoreActive &&
                <div className="modal">
                    <div className="modalContent" >
                        <div  style = {{ width: '100%', width: '100%',flexFlow: 'column wrap', display: 'flex', flex: 1, flexDirection: 'rows', alignItems: 'center'}} >
                            <HeaderText style={{ marginTop: 20, marginBottom: 20, userSelect: "none"}} fontSize={36}>Results</HeaderText>
                            <DefaultText style={{ marginBottom: 20, userSelect: "none"}} fontSize={36}>{`Score: ${score}%`}</DefaultText>
                            <div style = {{ marginBottom: 30, width: '100%', width: '100%', display: 'flex', flex: 1, flexDirection: 'rows', alignItems: 'center'}}>
                                <DefaultButton 
                                    style = {{ backgroundColor: "pink", marginLeft: 30, marginRight: 30}}
                                    onClick={onExit}
                                    border="none"    
                                    value="Exit"
                                />    
                                { score != 100 &&                     
                                    <DefaultButton 
                                        style = {{ marginLeft: 30, marginRight: 30}}
                                        onClick={onTryAgain}
                                        border="none"    
                                        value="Try Again"
                                    />
                                }   
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isModalErrorActive &&
                <div className="modal">
                    <div className="modalContent" >
                        <div  style = {{ width: '100%', width: '100%',flexFlow: 'column wrap', display: 'flex', flex: 1, flexDirection: 'rows', alignItems: 'center'}} >
                            <HeaderText style={{ marginTop: 20, marginBottom: 20, userSelect: "none"}} fontSize={36}>Error</HeaderText>
                            <DefaultText style={{ marginBottom: 20, userSelect: "none"}} fontSize={36}>All blocks must be used</DefaultText>
                            <div style = {{ marginBottom: 30, width: '100%', width: '100%', display: 'flex', flex: 1, flexDirection: 'rows', alignItems: 'center'}}>                           
                                <DefaultButton 
                                    style = {{ marginLeft: 30, marginRight: 30}}
                                    onClick={onCloseError}
                                    border="none"    
                                    value="Close"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );  
}

export default CompletingTaskScreen
  