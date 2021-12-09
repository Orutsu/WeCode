import React, {useState, useMemo, useEffect} from "react";
import DefaultText from "../../components/DefaultText";
import HeaderText from "../../components/HeaderText";
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";
import Header from "../../components/Header";
import PlusIcon from '../../assets/plus.svg';
import { useTypedSelector } from "../../redux/store";
import './style.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { getAllCodeBlocks, getTaskWithCodeBlocks, updateTask  } from "../../services/TaskService";
import { useNavigate } from 'react-router-dom';

const EditTaskScreen = () => {
    const navigate = useNavigate()
    const [blocks, setBlocks] = useState([])
    const [taskNameText, setTaskNameText] = useState('')
    const [descriptionText, setDescriptionText] = useState('')
    const [complexityText, setComplexityText] = useState('')
  
    const { taskIdToEdit} = useTypedSelector((store) => store.auth)
    const {user} = useTypedSelector((store) => store.auth)


    useEffect(async () => {
        const taskInfoWIthCodeBlocks = await getTaskWithCodeBlocks(taskIdToEdit);
        const codeBlocks = await getAllCodeBlocks();
        setTaskNameText(taskInfoWIthCodeBlocks.task.title);
        setDescriptionText(taskInfoWIthCodeBlocks.task.description);
        setComplexityText(taskInfoWIthCodeBlocks.task.difficulty);
        let blocks = taskInfoWIthCodeBlocks.expectedResults?.map((expectedResult) => {
            return {id : expectedResult.codeBlockId, text : (codeBlocks.find(block => block.codeBlockId === expectedResult.codeBlockId)).code};
        })

        setBlocks(blocks);

    }, []);


    const isSaveButtonPressable = useMemo(() => {
        if (taskNameText === '' || descriptionText === '' || complexityText === '') {
            return false 
        } else {
            return true
        }
    }, [taskNameText, descriptionText, complexityText])
  
    const onSaveClick = () => {
        updateTask(taskIdToEdit, user.userId, taskNameText, descriptionText, parseInt(complexityText));
        navigate('/moduleselection', { replace: false })
    }
  
    const onCloseClick = () => {
        navigate('/moduleselection', { replace: false })
    }
  
  
    const Block = ({block, index}) => {
        return (
            <div   className="Block" style={{ width: '100%', padding: 10, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
                <DefaultText  fontSize={28} style = {{ width: 30, textAlign: 'center', userSelect: "none",  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{index + 1}</DefaultText>         
                <DefaultText  fontSize={28} style = {{ textAlign: 'center', userSelect: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{block.text}</DefaultText>
                <p></p>
            </div>
        )
    };
  
    function onSetComplexityText(text) {
        var value = parseInt(text);
        if((value > 0 && value <= 10) || text == ""){
            setComplexityText(text)
        }
    }
    
  
    return (
        <div className="editTaskContainer">
            <Header />
            <div className="taskEditPageContainer">
            <div className="column">
                <HeaderText fontSize={48}>Create task</HeaderText>
                <DefaultInput value={taskNameText} placeholder="Name" onChange={(text) => setTaskNameText(text)} style={{marginTop: 10, width: 450}}/>
                <DefaultInput value={descriptionText} placeholder="Description" isMultiline onChange={(text) => setDescriptionText(text)} style={{marginTop:25, height: 400}}/>
                <DefaultInput value={complexityText} placeholder="Complexity"  onChange={(text) => onSetComplexityText(text)} style={{marginTop:25}}/>
                <DefaultButton 
                    border="none"    
                    onClick={isSaveButtonPressable ? onSaveClick : null}
                    value="Save"
                    style={{marginTop: 50, opacity: isSaveButtonPressable ? 1 : 0.5}}
                />            
                <DefaultButton 
                    border="none"    
                    onClick={onCloseClick}
                    value="Close"
                    style={{ backgroundColor: "#E4AEAE", marginTop: 10, opacity: 1}}
                />
            </div>
            <div style={{minHeight: 500, paddingLeft: 100,paddingRight: 25,  width: 500}}>
                <HeaderText fontSize={48} style={{userSelect: "none"}}>Blocks</HeaderText>
                <DefaultText fontSize={28} style={{userSelect: "none", paddingBottom: 20}}>(you can not edit blocks)</DefaultText>
                <div style = {{border: '10px solid #EDE7D7', borderRadius: 16, paddingTop: 20, display: 'flex', flex: 1, justifyContent:'center'}}>
                        <ul style = {{  width: '90%', minHeight: 300, margin: 0, padding: 0, listStyleType: "none"}}>
                        {blocks.map((block, index) => {
                            return (
                            <div style={{width: 400}} key={block.id}>
                                <li>
                                    <div style ={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                                    <Block  block={block} index={index}/>
                                    </div>
                                </li>
                            </div>
                            );
                        })}
                        </ul>
                </div>  
            </div>
            </div>
        </div>
    );  
}

export default EditTaskScreen
  