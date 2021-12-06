import React, {useState} from "react";
import Header from "../../components/Header";
import './style.css';

import HeaderText from "../../components/HeaderText";
import DefaultText from "../../components/DefaultText";
import DefaultInput from '../../components/DefaultInput'
import DefaultButton from '../../components/DefaultButton'
import { Link } from 'react-router-dom';

const UserCabinetScreen = ({isAdmin = false}) => {

    
    const [name, setName] = useState('Lan')
    const [surname, setSurname] = useState('Fan')
    const [email, setEmail] = useState('LanFan@gmail.com')
    const completedTasks = [
        {name:"Loops", score:"20%"},
        {name:"If statement", score:"100%"},
        {name:"While statement wefwefwefwefwef", score:"100%"},
        {name:"react library", score:"50%"},
        {name:"node modules", score:"40%"}
    ]
    const completedTasksAmount = 4;
    const successfullyCompletedTasksAmount = 2;
    const averageMark = "70%";

    
    const createdTasks = [
        {name:"Loops", description:"Practice your skills in obtaining requirements", complexity : "3"},
        {name:"If statement", description:"Practice your skills in creating user friendly design", complexity : "4"},
        {name:"While statement wefwefwefwefwef", description:"Practice your skills in system modeling. Learn more about UML", complexity : "3"},
        {name:"react library", description:"Practice your skills in writing good quality code. Learn more about clean code dfgdfhdfhjdfh dfh dfh dfhd fh", complexity : "5"},
        {name:"node modules", description:"Practice your skills in testing the system. Learn more about testing approaches", complexity : "3"}
    ]


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


    return (
        <div className="UserCabinetContainer">
            <Header />
            <div style={{marginTop: 50, paddingLeft: 100, paddingRight: 100, display: 'flex', flex: 1, flexDirection: 'rows', justifyContent: "space-between"}}>
                <div style={{width: 350}}> 
                    <HeaderText style={{ height: 70}} fontSize={50}>Profile</HeaderText>
                    <DefaultText fontSize={28}>Name</DefaultText>
                    <DefaultInput style={{marginBottom: 10}} value={name} placeholder="Email" onChange={(text) => setName(text)} />
                    <DefaultText fontSize={28}>Surname</DefaultText>
                    <DefaultInput style={{marginBottom: 10}} value={surname} placeholder="Email" onChange={(text) => setSurname(text)} />
                    <DefaultText fontSize={28}>Email</DefaultText>
                    <DefaultInput style={{marginBottom: 10}} value={email} placeholder="Email" onChange={(text) => setEmail(text)} />
                    <DefaultButton border="none"    
                        onClick={() => console.log("Change password")}
                        value="Change password"
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
