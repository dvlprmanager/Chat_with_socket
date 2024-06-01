import React, { useEffect, useState, useRef, useContext } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { HiDotsVertical } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import { CgLogOut } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

import sound from '../assets/sound/whats-app-whatsapp-tone.mp3'
import { ContentContext } from '../context/Context';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const socket = io('http://192.168.56.1:4000', { transports: ['websocket'] });

const HomePage = () => {

  const { Logout, saveMessages, allMesages } = useContext(ContentContext);


  const user = JSON.parse(localStorage.getItem('userSesion')) || { username: 'Desconocido' };
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const mensajesEndRef = useRef(null);


  useEffect(() => {
    async function fetchData() {
      const historymessages = await allMesages();
      if (historymessages.ok) {
        const mensajesArray = historymessages.messages.map(hmessage => ({
          uid: hmessage.uid,
          usuario: hmessage.nameUser,
          mensaje: hmessage.message
        }));
        console.log(mensajesArray)
        setMensajes(mensajesArray);
      }
    }

    fetchData();
  }, []);

  useEffect (  () => {

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('new_user', user);
    };

    const handleChatMessage = (data) => {

      if(data.value === 1 || data.value === 2 ){
        toast(`${data.usuario + " " + data.mensaje}  `);
       

      }else{
        setMensajes((mensajes) => [...mensajes, data]);
      }
      if (data.usuario !== user.name) {
        new Audio(sound).play(); // Reproducir sonido solo para mensajes nuevos del servidor
      }
    };

    socket.on('connect', handleConnect);
    socket.on('chat_message', handleChatMessage);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('chat_message', handleChatMessage);
    };
  }, [user]);

  const enviarMensaje = async () => {
    const mensajesFragmentados = fragmentarMensaje(nuevoMensaje, 80);
    await mensajesFragmentados.forEach(fragmento => {
    socket.emit('chat_message', {
        usuario: user.name,
        mensaje: fragmento,
      });

      const saveMensaje = {
        uid: user.uid,
        nameUser: user.name,
        message: fragmento
      };
      saveMessages(saveMensaje);

    });
    setNuevoMensaje('');
    scrollToBottom();
  };

  const desconecta = async () =>{
    await socket.emit('allow_user', user);  
    await Logout()
  }

  const fragmentarMensaje = (mensaje, maxLength) => {
    const palabras = mensaje.split(' ');
    const fragmentos = [];
    let fragmentoActual = '';

    palabras.forEach(palabra => {
      if ((fragmentoActual + ' ' + palabra).trim().length > maxLength) {
        fragmentos.push(fragmentoActual.trim());
        fragmentoActual = palabra;
      } else {
        fragmentoActual += ' ' + palabra;
      }
    });

    if (fragmentoActual.trim().length > 0) {
      fragmentos.push(fragmentoActual.trim());
    }

    return fragmentos;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensaje();
    }
  };

  const scrollToBottom = () => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [mensajes]);

  return (
    <div className=''>
      <header className='sticky top-0 h-16 bg-blue-950 flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>

          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{nuevoMensaje?.id}</h3>
            <p className='-my-2 text-sm'>
              {isConnected ? <span className='text-white'>{user.name} Online</span> : <span className='text-slate-400'>Offline</span>}
            </p>
          </div>
        </div>
        <div>
          <button
           className='cursor-pointer text-white  hover:text-red-600'
           onClick={()=>desconecta()}
           >
          <CgLogOut size={25} />
          </button>
        </div>
      </header>

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-blue-200 bg-opacity-50'>
        <div className='flex flex-col gap-2 py-2 mx-2'>
          {mensajes.map((msg, index) => (
            <div key={index} className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${msg.usuario === user.name ? 'mr-auto bg-blue-300' : 'ml-auto bg-green-300'}`}>
              <div className='w-full relative'>
                <span className='font-semibold'>{msg.usuario}</span>
              </div>
              <p className='px-2'>{msg.mensaje}</p>
            </div>
          ))}
          <div ref={mensajesEndRef} />
        </div>
      </section>

      <section className='h-16 bg-white flex items-center px-4'>
        <div className='h-full w-full flex gap-2'>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-1 px-4 outline-none w-full h-full'
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className='text-primary hover:text-secondary' onClick={enviarMensaje}>
            <IoMdSend size={28} />
          </button>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
