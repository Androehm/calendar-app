import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {SignInPage} from "./pages/SignInPage"
import {CalendarPage} from "./pages/CalendarPage"



export const RoutesMap = () =>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<CalendarPage />}/>
                <Route path="/sign-in" element={<SignInPage/>} />
            </Routes>            
        </Router>
    )
}