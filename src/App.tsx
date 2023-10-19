import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "@components/AuthLayout";
import Homepage from "@pages/website/Homepage";
import Signup from "@pages/website/Signup";
import SignIn from "@pages/website/SignIn";
import Dashboard from "@pages/website/Dashboard";
import Patient from "@pages/website/Patient";
import EditImage from "@pages/website/Test";

import UploadImage from "@pages/line/UploadImage";
import SignUpLine from "@pages/line/SignUp"
import Equipment from "@pages/website/Equipment";

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
      </Route>
    </Routes>
  );
}
export default App;
