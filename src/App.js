import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import ProtectedRoutes, { ProtectedLogin } from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="myProfile" element={<MyProfile />} />
        </Route>

        <Route element={<ProtectedLogin />}>
          <Route path="auth">
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

        <Route path="*" element={<div> <h1 style={{textAlign:"center"}}>Wrong Component rendered</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
