import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "@layouts/AuthLayout";
import Homepage from "@pages/website/Homepage";
import Signup from "@pages/website/Signup";
import SignIn from "@pages/website/SignIn";
import Dashboard from "@pages/website/Dashboard";
import Patient from "@pages/website/Patient";
import EditImage from "@pages/website/Test";
import WoundAnalysis from "@pages/website/WoundAnalysis";
import Equipment from "@pages/website/Equipment";
import Compare from "@pages/website/Compare";
import Allocation from "@pages/website/Allocation";
import PatientDetail from "@pages/website/PatientDetail";
import ResetPassword from "@pages/website/ResetPassword";
import ConfirmReset from "@pages/website/ConfirmReset";
import ContactUs from "@pages/website/Contact";
import NewPass from "@pages/website/NewPassword"
import Progress from "@pages/website/Progress"

import UploadImage from "@pages/line/UploadImage";
import SignUpLine from "@pages/line/SignUp";
import SignInLine from "@pages/line/SignIn";
import HistoryLine from "@pages/line/History";

import TestPred from "@pages/website/testPred";
import { LoadingProvider } from "@components/Loading";
import { AuthProvider } from "@components/AuthProvider";
import Account from "@pages/website/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/line/*" element={<LineRoutes />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="confirm" element={<ConfirmReset />} />
        <Route path="newPassword" element={<NewPass />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="/*" element={<AuthRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}
function LineRoutes() {
  return (
    <Routes>
      <Route path="uploadImage" element={<UploadImage />} />
      <Route path="signup" element={<SignUpLine />} />
      <Route path="signin" element={<SignInLine />} />
      <Route path="history" element={<HistoryLine />} />
    </Routes>
  );
}
function AuthRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoadingProvider>
            <AuthProvider>
              <AuthLayout />
            </AuthProvider>
          </LoadingProvider>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patient" element={<Patient />} />
        <Route path="patient/:case_id" element={<PatientDetail />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="test" element={<EditImage />} />
        <Route path="wound/:img_id" element={<WoundAnalysis />} />
        <Route path="pred" element={<TestPred />} />
        <Route path="compare" element={<Compare />} />
        <Route path="progress" element={<Progress />} />
        <Route path="allocation" element={<Allocation />} />
        <Route path="account" element={<Account />} />
      </Route>
    </Routes>
  );
}
export default App;
