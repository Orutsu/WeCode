import React, {useState} from "react";
import DefaultText from "../../components/DefaultText";
import HeaderText from "../../components/HeaderText";
import Header from "../../components/Header";
import PlusIcon from '../../assets/plus.svg';
import './style.css';

const CreateTaskScreen = () => {
  const [addedBlocks, setAddedBlocks] = useState([])
  const [lastAddedBlockId, setLastAddedBlockId] = useState(0)
  const [blockNameInputText, setBlockNameInputText] = useState('')

  const addNewBlockToList = () => {
    if (blockNameInputText === '') {
      return
    }
    const newAddedBlocks = [...addedBlocks, {value: blockNameInputText, id: lastAddedBlockId + 1}]
    setBlockNameInputText('')
    setLastAddedBlockId((prev) => prev + 1)
    setAddedBlocks(newAddedBlocks)
  }

  return (
    <div className="createTaskContainer">
      <Header />
      <div className="pageContainer">
        <div className="column">
          <HeaderText fontSize={48}>Create task</HeaderText>
        </div>
        <div className="column blocks">
          <HeaderText fontSize={48}>Blocks</HeaderText>
          <div className="blocksContainer">
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              {addedBlocks.map((item, index) => {
                return (
                  <div className="taskBlock" style={{marginTop: 30}}>
                    <DefaultText style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                      {item.id}
                    </DefaultText>
                    <DefaultText style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                      {item.value}
                    </DefaultText>
                  </div>
                )
              })}
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
        </div>
        <div className="column">
          <HeaderText fontSize={48}>Right Sequence</HeaderText>
        </div>
      </div>
    </div>
  );  
}

export default CreateTaskScreen
  