import { useSpring, animated, useChain, config, useSpringRef } from 'react-spring';
import { PiUserCircleLight  } from 'react-icons/pi';
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
          <span className="font-extrabold text-4xl text-red-500">Gym</span>
          <span className="font-extrabold text-4xl">Fitness</span>
        </div>

        {showTabs && (
          <>
            <ul className="flex space-x-9 mr-40">
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 cursor-pointer transition duration-500"
                >
                  Todos os exercícios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-red-500 cursor-pointer transition duration-500"
                >
                  Meus pesos
                </a>
              </li>
            </ul>
            <PiUserCircleLight size={40} />
          </>
        )}
      </div>
    </animated.header>
  );
}

export default Header;