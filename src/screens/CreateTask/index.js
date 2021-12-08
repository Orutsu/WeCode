import React, {useState, useMemo} from "react";
import DefaultText from "../../components/DefaultText";
import HeaderText from "../../components/HeaderText";
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";
import Header from "../../components/Header";
import PlusIcon from '../../assets/plus.svg';
import { useTypedSelector } from "../../redux/store";
import './style.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { FaMinus } from 'react-icons/fa';
import { createTask } from "../../services/TaskService";
import { useNavigate } from 'react-router-dom';

const CreateTaskScreen = () => {
  const navigate = useNavigate()
  const {user} = useTypedSelector((store) => store.auth)
  const [addedBlocks, setAddedBlocks] = useState([])
  const [lastAddedBlockId, setLastAddedBlockId] = useState(0)
  const [blockNameInputText, setBlockNameInputText] = useState('')
  const [taskNameText, setTaskNameText] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [complexityText, setComplexityText] = useState('')
  const [rightSequenceText, setRightSequenceText] = useState('')

  const isSumbitButtonPressable = useMemo(() => {
    if (taskNameText === '' || descriptionText === '' || complexityText === '' || rightSequenceText === '' || addedBlocks.length === 0) {
      return false 
    } else {
      return true
    }
  }, [taskNameText, descriptionText, complexityText, rightSequenceText, addedBlocks])

  const onSubmitClick = () => {
    const codeBlockString = addedBlocks.map(a => a.value);
    console.log(user.userId, taskNameText, descriptionText, complexityText, codeBlockString, rightSequenceText);
    createTask(user.userId, taskNameText, descriptionText, complexityText, codeBlockString, rightSequenceText);
    navigate('/moduleselection', { replace: false })
  }

  const addNewBlockToList = () => {
    if (blockNameInputText === '') {
      return
    }
    const newAddedBlocks = [...addedBlocks, {value: blockNameInputText, id: `${lastAddedBlockId + 1}`}]
    setBlockNameInputText('')
    setLastAddedBlockId((prev) => prev + 1)
    setAddedBlocks(newAddedBlocks)
  }

  function handleOnDragEnd(result){
    if(!result.destination) return;
    const items = Array.from(addedBlocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setAddedBlocks(items);
  }

  const Block = ({block, index, isAvailable, ...restProps}) => {
    const onAddedClick = function () {
      let index = -1;
      for(let i = 0; i < addedBlocks.length; ++i) {
          if(addedBlocks[i].id == block.id) {
              index = i;
          }
      }
      if (index !== -1) {
          addedBlocks.splice(index, 1);
          setAddedBlocks([...addedBlocks]);
      }
  }

    return (
      <div {...restProps}  className="Block" style={{ width: '100%', padding: 10, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
        <DefaultText  fontSize={28} style = {{ width: 30, textAlign: 'center', userSelect: "none",  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{index + 1}</DefaultText>         
        <DefaultText  fontSize={28} style = {{ textAlign: 'center', userSelect: "none", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{block.value}</DefaultText>
        <FaMinus onClick={onAddedClick} size="22" min="22"/>
      </div>
    )
  };

  return (
    <div className="createTaskContainer">
      <Header />
      <div className="pageContainer">
        <div className="column">
          <HeaderText fontSize={48}>Create task</HeaderText>
          <DefaultInput value={taskNameText} placeholder="Name" onChange={(text) => setTaskNameText(text)} style={{marginTop: 10, width: 450}}/>
          <DefaultInput value={descriptionText} placeholder="Description" isMultiline onChange={(text) => setDescriptionText(text)} style={{marginTop:25, height: 400}}/>
          <DefaultInput value={complexityText} placeholder="Complexity"  onChange={(text) => setComplexityText(text)} style={{marginTop:25}}/>
        </div>
        <div style={{minHeight: 500, paddingLeft: 25,paddingRight: 25,  width: 500}}>
          <HeaderText fontSize={48} style={{userSelect: "none"}}>Blocks</HeaderText>
          <div style = {{border: '10px solid #EDE7D7', borderRadius: 16, paddingTop: 20, display: 'flex', flex: 1, justifyContent:'center'}}>
            <DragDropContext  onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="addedBlocks">
                {(provided) => (
                  <ul style = {{  width: '90%', minHeight: 300, margin: 0, padding: 0, listStyleType: "none"}} {...provided.droppableProps} ref={provided.innerRef}>
                    {addedBlocks.map((block, index) => {
                      return (
                        <Draggable style={{width: 400}} key={block.id} draggableId={block.id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} >
                              <div style ={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                                <Block  {...provided.dragHandleProps} isAvailable = {false} key = {block.id} block={block} index={index}/>
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
            <div style={{marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <div className="blockNameContainer">
                <input 
                    className="blockNameInput" 
                    placeholder="Block name" 
                    value={blockNameInputText}
                    onChange={(event) => setBlockNameInputText(event.target.value)}
                />
              </div>
              <div style={{marginLeft: 10}} onClick={addNewBlockToList}>          
                <img src={PlusIcon} alt={"Plus Icon"}/>
              </div>
            </div>      
        </div>
        <div className="column">
          <HeaderText fontSize={48}>Right Sequence</HeaderText>
          <DefaultInput value={rightSequenceText} placeholder="2, 3 ...." onChange={(text) => setRightSequenceText(text)} style={{marginTop: 10, width: 450}}/>
          <DefaultText fontSize={24} style={{width: 450, marginTop: 40}}>
            Please, write correct sequnce separate by comas which will be a solution for your task.
            <br/>
            Example:
            <br/>
            1, 2, 3
          </DefaultText>
          <DefaultButton 
              border="none"    
              onClick={isSumbitButtonPressable ? onSubmitClick : null}
              value="Submit"
              style={{marginTop: 50, opacity: isSumbitButtonPressable ? 1 : 0.5}}
          />
        </div>
      </div>
    </div>
  );  
}

export default CreateTaskScreen
  