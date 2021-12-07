import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ModuleSelectionScreen from "./screens/ModuleSelectionScreen";
import TasksListScreen from "./screens/TasksList";
import UserCabinetScreen from "./screens/UserCabinet";
import WebFont from 'webfontloader';

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Quando', 'Roboto']
      }
    });
   }, []);
  
  return (
    <Router>
        <Routes>
          <Route path="/signin" element={<SignInScreen />}/>
          <Route path="/signup" element={<SignUpScreen />}/>
          <Route path="/moduleselection" element={<ModuleSelectionScreen />}/>
          <Route path="/taskslist" element={<TasksListScreen />}/>
          <Route path="/usercabinet" element={<UserCabinetScreen />}/>
          <Route path="/" element={<RedirectingHandler />} />
        </Routes >
    </Router>
  );
}

function RedirectingHandler() {
  const isAuth = false; 
  if (isAuth) {
    return <Navigate to="/moduleselection" />;
  } else {
    return <Navigate to="/signin" />;
  }
}


