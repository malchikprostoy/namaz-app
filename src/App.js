// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./features/AuthContext";
import "./App.css";
import Form from "./components/Form/Form";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Form />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
