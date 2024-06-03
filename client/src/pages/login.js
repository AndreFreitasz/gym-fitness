import React from 'react';
import Header from "../components/header";
import InputField from "../components/forms/InputField";
import Button from '../components/forms/button';
import { useSpring, animated } from 'react-spring';
import { FiUser, FiLock } from 'react-icons/fi';

const Login = () => {

  const animationProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    from: { opacity: 0, transform: 'translate3d(0,200px,0)' },
    delay: 300
  });

  return (
    <>
      <Header showTabs={false} />

      <div className="flex justify-center items-center h-screen-72">
        <animated.form
          style={animationProps}
          className="shadow rounded-2xl px-8 pt-6 pb-8 mb-4 w-full mx-auto sm:w-1/2 lg:bg-[#1B2735]"
        >
          <h1 className="text-white text-3xl mb-6 text-center font-bold">Login</h1>

          <div className="flex flex-row justify-content align-center my-6">
            <FiUser size={32} className='text-white mx-auto mr-4' />
            <InputField
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              className="additional-classes"
            />
          </div>
          <div className="flex flex-row justify-content align-center my-6">
            <FiLock size={32} className='text-white mx-auto mr-4' />
            <InputField
              name="password"
              id="password"
              type="password"
              placeholder="Senha"
              className="additional-classes"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between mt-12">
            <a 
              href="/register"
              className="text-red-500 text-md font-medium cursor-pointer hover:opacity-60 transition-opacity duration-500"
            >
              Não tem uma conta? Se cadastre aqui!
            </a>
            <Button
              className="additional-classes"
              type="submit"
            >
              Entrar
            </Button>
          </div>

        </animated.form>
      </div>
    </>
  );
}

export default Login;