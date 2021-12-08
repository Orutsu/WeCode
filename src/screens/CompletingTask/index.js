import React, {useState, useEffect} from "react";
import DefaultText from "../../components/DefaultText";
import HeaderText from "../../components/HeaderText";
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import './style.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { getAllCodeBlocks, getCodeBlock, getTaskWithCodeBlocks } from "../../services/TaskService";
import DefaultButton from '../../components/DefaultButton'

const CompletingTaskScreen = ({taskId}) => {
    const [taskInfo, setTaskInfo] = useState({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        //taskid
        const taskInfoWIthCodeBlocks = await getTaskWithCodeBlocks(18);
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

        setTaskInfo(taskInfoMapped);
        setBlocksAvailableArray(taskInfo.blocks);
      }, []);

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
                                            <Draggable style={{width: 400}}key={block.id} draggableId={block.id} index={index}>
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
                        onClick={() => {console.log("Submit", blocksUsedArray)}}
                        value="Submit"
                        style={{marginTop: 50}}
                    />
                </div>

                
            </div>
        </div>
    );  
}

export default CompletingTaskScreen
  