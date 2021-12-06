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

    const requirementsDescription = "Practice your skills in obtaining requirements"
    const designDescription = "Practice your skills in creating user friendly design"
    const modelingDescription = "Practice your skills in system modeling. Learn more about UML"
    const codingDescription = "Practice your skills in writing good quality code. Learn more about clean code"
    const testingDescription = "Practice your skills in testing the system. Learn more about testing approaches"

    return (
        <div className="ModuleSelectionContainer">
            <Header />
            <div style={{display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center'}}> 
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <ModuleCard name="Requirements Analysis" description={requirementsDescription} isDisabled/>
                    <div style={{width: 40}}/>
                    <ModuleCard name="Design" description={designDescription} isDisabled/>
                    <div style={{width: 40}}/>
                    <ModuleCard name="Modelling" description={modelingDescription} isDisabled/>
                </div>
                <div style={{height: 40}}/>
                <div  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <ModuleCard name="Coding" description={codingDescription} />
                    <div style={{width: 40}}/>
                    <ModuleCard name="Testing" description={testingDescription} isDisabled/>
                </div>
            </div>
        </div>
    );  
}

export default ModuleSelectionScreen
  