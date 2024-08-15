import { useSpring, animated, useChain, config, useSpringRef } from 'react-spring';
import React from 'react';
import '../../css/index.css';
import LogoutButton from '../forms/logoutButton';

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
    <animated.header style={headerProps} className=" text-white p-4 mb-4">
      <div className="flex justify-between items-center mx-7">
        {/* <div>
          <span className="font-extrabold text-5xl text-red-500">Gym</span>
          <span className="font-extrabold text-5xl">Fitness</span>
        </div> */}

        {showTabs && (
          <>
            <ul className="flex space-x-9 mr-40">
              <li>
                <a
                  href="https://www.google.com.br/?hl=pt-BR"
                  className="hover:text-red-500 text-lg cursor-pointer transition duration-500 font-semibold"
                >
                  Home
                </a>
              </li>
            </ul>
            <LogoutButton />
          </>
        )}
      </div>
    </animated.header>
  );
}

export default Header;