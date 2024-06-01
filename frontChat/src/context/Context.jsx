import {createContext, useState, useContext, useEffect} from 'react';
import { PostRoute } from '../Services/Public';
import { RouteBase } from '../Services/BaseUrl';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ContentContext = createContext();



export const ContentProvider = ({children}) => {

  const navigate = useNavigate();
  const [valLogin, setvalLogin]  = useState(false),
        [loginData, setLoginData] =  useState([]),


          Login  =  async (data)  =>{
            let response = [];
            response  = await PostRoute(`${RouteBase}/auth/login`, data);
            
            if(response.uid){
             await localStorage.setItem('userSesion',JSON.stringify(response));
             await setvalLogin(true);
            }

           window.location.reload();
          },
          Register  =  async (data)  =>{
            let response = [];
            response  = await PostRoute(`${RouteBase}/auth/new`, data);
            if(response.uid){
              await localStorage.setItem('userSesion',JSON.stringify(response));
              await setvalLogin(true);
             }

             toast(`USUARIO CREADO EXITOSAMENTE`);
             window.location.reload();
          },

          Logout = () =>{
            localStorage.clear();
            setvalLogin(false)
            window.location.reload();
          },
      
      
      value = {
        valLogin,
        Login,
        Logout,
        Register
      }

  
    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  }