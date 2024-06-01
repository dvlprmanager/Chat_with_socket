import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AuthRoutes from './AuthRoutes';
import { ContentContext } from '../context/Context'
import HomeRoutes from './HomeRoutes';



const AppRoutes = () => {
  let okSession = false;

  const value = JSON.parse(localStorage.getItem('userSesion'));

  if(value) okSession = value.ok;



  return (
    <Routes>
        {
            (okSession === true)
            ? <Route path='/*' element={<HomeRoutes/>}/>
            :
             <Route path='/auth/*' element={<AuthRoutes/>}/>
             
        }
        <Route path="/*" element={<Navigate to='/auth'/>} />
    </Routes>
  )
}

export default AppRoutes