// import "./App.css";
import { useState } from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import EditUser from "./Components/EditUser";
import AddUser from "./Components/AddUser";

function App() {
  const [loggedin, setLoggedIn] = useState({ auth: false, userType: "" });
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            loggedin.auth ? (
              <Dashboard accType={loggedin.userType} acc={setLoggedIn} />
            ) : (
              <Login acc={setLoggedIn} />
            )
          }
        />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/add" element={<AddUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
