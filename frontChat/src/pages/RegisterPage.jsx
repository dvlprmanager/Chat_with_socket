import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ContentContext } from '../context/Context';
import { ToastContainer } from 'react-toastify';

const RegisterPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const { Register } = useContext(ContentContext);

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    Register(data);
  };

  const password = watch('password');

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Crea tu cuenta.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              llena todos los siguientes campos para crear tu cuenta.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Nombres</label>
                <input
                  type="text"
                  placeholder="John"
                  {...register('firstName', { required: 'Nombres es requerido' })}
                  className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.firstName ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700`}
                />
                {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Apellidos</label>
                <input
                  type="text"
                  placeholder="Snow"
                  {...register('lastName', { required: 'Apellidos es requerido' })}
                  className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.lastName ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700`}
                />
                {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Número de teléfono</label>
                <input
                  type="text"
                  placeholder="XXX-XX-XXXX-XXX"
                  {...register('phoneNumber', { 
                    required: 'Número de teléfono es requerido', 
                    pattern: {
                      value: /^\d+$/,
                      message: 'Número de teléfono debe contener solo números'
                    }
                  })}
                  className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700`}
                />
                {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="johnsnow@example.com"
                  {...register('email', { 
                    required: 'Correo electrónico es requerido', 
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: 'Correo electrónico no es válido'
                    }
                  })}
                  className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.email ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700`}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Contraseña</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', { required: 'Contraseña es requerida' })}
                  className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.password ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700`}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirmar Contraseña</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register('confirmPassword', { 
                    required: 'Confirmación de contraseña es requerida', 
                    validate: value => value === password || 'Las contraseñas no coinciden' 
                  })}
                  className={`block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:outline-none focus:ring focus:ring-opacity-40 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} dark:border-gray-700`}
                />
                {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
              </div>

              <button type="submit" className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Registrarse </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage;
