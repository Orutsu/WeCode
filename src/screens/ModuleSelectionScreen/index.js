import React from "react";
import DefaultText from "../../components/DefaultText";
import HeaderText from "../../components/HeaderText";
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import './style.css';

const ModuleSelectionScreen = () => {
    const ModuleCard = ({name, description, isDisabled}) => {
        return (
            <Link className="ModuleCard" to={isDisabled ? '#' : '/taskslist'} style={{padding: 20, paddingTop: 30}}>          
                <HeaderText fontSize={36} style={{textAlign: 'left'}}>{name}</HeaderText>
                <DefaultText fontSize={18} style={{paddingTop: 10}}>{description}</DefaultText>
            </Link>
        )
    }

    const mockDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

    return (
        <div className="ModuleSelectionContainer">
            <Header />
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <ModuleCard name="Request Analysis" description={mockDescription} isDisabled/>
                    <div style={{width: 40}}/>
                    <ModuleCard name="Design" description={mockDescription} isDisabled/>
                    <div style={{width: 40}}/>
                    <ModuleCard name="Modelling" description={mockDescription} isDisabled/>
                </div>
                <div style={{height: 40}}/>
                <div  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <ModuleCard name="Coding" description={mockDescription} />
                    <div style={{width: 40}}/>
                    <ModuleCard name="Testing" description={mockDescription} isDisabled/>
                </div>
            </div>
        </div>
    );  
}

export default ModuleSelectionScreen
  