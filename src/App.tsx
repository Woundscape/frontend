import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "@components/AuthLayout";
import Homepage from "@pages/website/Homepage";
import Signup from "@pages/website/Signup";
import SignIn from "@pages/website/SignIn";
import Dashboard from "@pages/website/Dashboard";
import Patient from "@pages/website/Patient";

import UploadImage from "@pages/line/UploadImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/line/*" element={<LineRoutes />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
function LineRoutes(){
  return (
    <Routes>
      <Route path="uploadImage" element={<UploadImage />} />
    </Routes>
  );
}
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patient" element={<Patient />} />
      </Route>
    </Routes>
  );
}
export default App;
