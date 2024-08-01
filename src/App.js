import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Profile from "./Components/Profile";
import AddProducts from "./Components/AddProducts";
import UpdateProducts from "./Components/UpdateProducts";
import Logout from "./Components/Logout";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import SingUp from "./Components/SingUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginPage from "./Components/LoginPage";
import VerifyOtpPage from "./Components/optscreen.js";
import ForgotPasswordPage from "./Components/ForgotPasswordPage.js";
import SetPasswordPage from "./Components/SetPasswordPage.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SingUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOtpPage />} />
          <Route path="/set-password" element={<SetPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Products />} />
            <Route path="/add-products" element={<AddProducts />} />
            <Route path="/update-products" element={<UpdateProducts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
