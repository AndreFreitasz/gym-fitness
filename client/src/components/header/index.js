import { useSpring, animated, useChain, config, useSpringRef } from 'react-spring';
import { FaUser } from "react-icons/fa";
import React from 'react';
import '../../css/index.css';

function Header({ showTabs }) {
  const headerRef = useSpringRef();

  const headerProps = useSpring({ 
    ref: headerRef,
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' }, 
    from: { opacity: 0, transform: 'translate3d(0,-200px,0)' },
    delay: 800,
    config: config.stiff
  });

  useChain([headerRef], [0]);

  return (
    <animated.header style={headerProps} className=" text-white p-4">
      <div className="flex justify-between items-center mx-7">
        <div>
          <span className="font-extrabold text-5xl text-red-500">Gym</span>
          <span className="font-extrabold text-5xl">Fitness</span>
        </div>

        {showTabs && (
          <>
            <ul className="flex space-x-9 mr-60">
              <li>
                <a
                  href="https://www.google.com.br/?hl=pt-BR"
                  className="hover:text-red-500 text-lg cursor-pointer transition duration-500 font-semibold"
                >
                  Todos os exercícios
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com.br/?hl=pt-BR"
                  className="hover:text-red-500 text-lg cursor-pointer transition duration-500 font-semibold"
                >
                  Meus pesos
                </a>
              </li>
            </ul>
            <FaUser size={38} className='cursor-pointer' />
          </>
        )}
      </div>
    </animated.header>
  );
}

export default Header;