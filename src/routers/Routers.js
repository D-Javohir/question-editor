import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import Login from "../pages/Login";

import Savol from '../Savoljavob/Savol'

import Tables from '../Table/Tables'
import Unsplash from "../unsplash/Unsplash";
import SavolJavob from "../Savoljavob/SavolJavob";

const Routers = () => {

    const navigate= useNavigate()
    useEffect(() => {
        tokenREzes()
    }, [])
    const tokenREzes = () => {
        if (!localStorage.getItem('token')) {
        
            navigate('/login')
        }else{
            navigate('/')
        }
    }

    return (<>
      
             <Routes>
                <Route exact path='/' element={<Savol/>} />
                <Route path='/login' element={<Login/>} />
                <Route path={'/table'} element={<Tables />} />
                <Route path={'/unsplash'} element={<Unsplash />} />
                <Route path={'/savoljavob'} element={<SavolJavob/>} />
            </Routes>
     
          

     

    </>)
}
export default Routers;