import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signin" element={<SignInScreen />}/>
          <Route path="/signup" element={<SignUpScreen />}/>
          <Route path="/" element={<Home />} />
        </Routes >
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}


