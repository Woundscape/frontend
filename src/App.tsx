import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "@layouts/AuthLayout";
import Homepage from "@pages/website/Homepage";
import Signup from "@pages/website/Signup";
import SignIn from "@pages/website/SignIn";
import Dashboard from "@pages/website/Dashboard";
import Patient from "@pages/website/Patient";
import EditImage from "@pages/website/Test";
import WoundAnalysis from "@pages/website/WoundAnalysis";

import UploadImage from "@pages/line/UploadImage";
import SignUpLine from "@pages/line/SignUp"
import SignInLine from "@pages/line/SignIn"
import Equipment from "@pages/website/Equipment";

import TestPred from "@pages/website/testPred";

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
      <Route path="signup" element={<SignUpLine />} />
      <Route path="signin" element={<SignInLine />} />
    </Routes>
  );
}
function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patient" element={<Patient />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="test" element={<EditImage />} />
        <Route path="wound" element={<WoundAnalysis />} />
        <Route path="pred" element={<TestPred />} />
      </Route>
    </Routes>
  );
}
export default App;
