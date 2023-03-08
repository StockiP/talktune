import './App.css';
import withRoot from './modules/withRoot';
import * as React from "react";
import MainContent from "./pages/MainContent";
import { Routes, Route } from 'react-router-dom';
import Privacy from "./pages/Privacy";
import FAQ from "./pages/faq";
import Login from "./pages/login";
import ProtectedRoute from "./modules/components/ProtectedRoute";

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const handleLogin = (password) => {
        if (password === 'TalkTunePasswordBachelorsThesis') {
            setIsLoggedIn(true);
        } else {
            alert('Incorrect password');
        }
    };

    if (!isLoggedIn) {
        return (
            <Login handleLogin={handleLogin}/>
        );
    } else {
        return (
            <React.Fragment>
                <Routes>
                    <Route path="/" element={<ProtectedRoute isLoggedIn> <MainContent/> </ProtectedRoute>}/>
                    <Route path={"/privacy"} element={<ProtectedRoute isLoggedIn> <Privacy/> </ProtectedRoute>}/>
                    <Route path={"/faq"} element={<ProtectedRoute isLoggedIn> <FAQ/> </ProtectedRoute>}/>
                    <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                </Routes>
            </React.Fragment>
        );
    }
}


export default withRoot(App);
