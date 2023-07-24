import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Favourite from "./pages/favourite/Favourite";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Protect from "./component/Protect";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <Home />
              </Protect>
            }
          />
          <Route
            path="/favourite"
            element={
              <Protect>
                <Favourite />
              </Protect>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
