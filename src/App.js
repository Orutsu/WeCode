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
import { useTypedSelector } from "./redux/store";

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


