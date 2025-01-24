import Signup from "./components/accounts/Signup";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/accounts/Login";
import Profile from "./components/accounts/Profile";
import BlogHomePage from "./components/content/BlogHomePage";
 import { UserProvider } from "./components/accounts/UserProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/accounts/AuthContext";


import { TestComponent } from "./components/Navbar/TestComponent";
import EditProfile from "./components/accounts/EditProfile";

export default function App() {
    return (
       <div>
        <AuthProvider>
        <UserProvider>
    
       {/* <TestComponent /> */}
               <Navbar />
               <Routes>
                   <Route path="/" element={<Signup />} />
                   <Route path="/login" element={<Login />} />
                   <Route path="/profile" element={<Profile />} />
                   <Route path="/edit/profile/:id" element={<EditProfile /> } />
                   <Route path="/bloghomepage" element={<BlogHomePage />} />
               </Routes>
               
        </UserProvider>       
       </AuthProvider>
       <ToastContainer />
       </div>
        
    );
}
