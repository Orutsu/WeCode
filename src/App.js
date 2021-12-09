import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import WebFont from 'webfontloader';
import { useTypedSelector } from "./redux/store";
import CompletedTaskScreen from "./screens/CompletedTask";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ModuleSelectionScreen from "./screens/ModuleSelectionScreen";
import TasksListScreen from "./screens/TasksList";
import UserCabinetScreen from "./screens/UserCabinet";
import CompletingTaskScreen from "./screens/CompletingTask";
import CreateTaskScreen from "./screens/CreateTask";
import EditTaskScreen from "./screens/EditTask";

export default function App() {
  const { isAuth, user } = useTypedSelector((store) => store.auth)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Quando', 'Roboto']
      }
    });
   }, []);
  console.log('isUser',user, isAuth)
  return (
    <Router>
        <Routes>
          <Route path="/signin" element={<SignInScreen />}/>
          <Route path="/signup" element={<SignUpScreen />}/>
          <Route path="/moduleselection" element={<ModuleSelectionScreen />}/>
          <Route path="/taskslist" element={<TasksListScreen />}/>
          <Route path="/usercabinet" element={<UserCabinetScreen />}/>
          <Route path="/completingtask" element={<CompletingTaskScreen />}/>
          <Route path="/completedtask" element={<CompletedTaskScreen />}/>
          <Route path="/createtask" element={<CreateTaskScreen />}/>
          <Route path="/edittask" element={<EditTaskScreen />}/>
          <Route path="/" element={<RedirectingHandler />} />
        </Routes >
    </Router>
  );
}

function RedirectingHandler() {
  const { isAuth } = useTypedSelector((store) => store.auth)

  if (isAuth) {
    return <Navigate to="/moduleselection" />;
  } else {
    return <Navigate to="/signin" />;
  }
}


