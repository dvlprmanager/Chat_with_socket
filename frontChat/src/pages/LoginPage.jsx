import React, { useContext } from 'react';
import { ContentContext } from '../context/Context'
import { useForm } from 'react-hook-form';
import logo from '../assets/image/logo.png'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(),

  { Login } = useContext(ContentContext),

   onSubmit = (data) => {
    console.log(JSON.stringify(data));
    Login(data);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Universidad Mariano Galvez </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Proyecto Final, Sistemas Operativos 2, Grupo 5
              </p>
              <p className="max-w-xl  text-gray-300">
                Integrantes <br/> 
                GERSON MAURICIO ESCOBAR AGUILAR <br/>
                WILLIAM JOSUE CARRILLO SANDOVAL <br/>
                MARLON ORLANDO RAMIREZ LUX <br/>

              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
              </div>
              <p className="mt-3 text-gray-500 dark:text-gray-300">Inicia Sesion con tu Cuenta.</p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Direccion de Correo Electronico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="ejemplo@example.com"
                    {...register('email', { required: 'El Correo es Requerido', pattern: { value: /^\S+@\S+$/i, message: 'Correo Electronico invalido' } })}
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">
                      Contraseña
                    </label>
                    
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Tu Contraseña"
                    {...register('password', { required: 'La contraseña es requerida' })}
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </div>

                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Iniciar sesion
                  </button>
                </div>
              </form>
              <Link to='/auth/register'>
              <p className="mt-6 text-sm text-center text-gray-400">
                No tiene cuenta aun? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Registrarse</a>.
              </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
