import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../pages/Login";

import Savol from '../Savoljavob/Savol'

import Tables from '../Table/Tables'
import Unsplash from "../unsplash/Unsplash";
import SavolJavob from "../Savoljavob/SavolJavob";


const Routers = () => {

    const [profile, setProfile] = useState(false)

    useEffect(() => {
        tokenREzes()
    }, [])
    const tokenREzes = () => {
        if (localStorage.getItem('token')) {
            setProfile(true)
        }
    }

    return (<>
        {profile === true
            ?
            <Routes>
                <Route exact path='/' element={<Savol profile={profile} setprofile={setProfile} />} />

                <Route path={'/table'} element={<Tables />} />
                <Route path={'/unsplash'} element={<Unsplash />} />
                <Route path={'/savoljavob'} element={<SavolJavob  setprofile={setProfile}/>} />
            </Routes>

            :
            <Routes>
                <Route path='/' element={<Login profile={profile} setprofile={setProfile}/>} />
            </Routes>
        }


    </>)
}
export default Routers;