import {
  useSpring,
  animated,
  useChain,
  config,
  useSpringRef,
} from "react-spring";
import React from "react";
import "../../css/index.css";
import LogoutButton from "../forms/logoutButton";
import NavItem from "./navItem";

function Header({ showTabs, isActive }) {
  const headerRef = useSpringRef();

  const headerProps = useSpring({
    ref: headerRef,
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    from: { opacity: 0, transform: "translate3d(0,-200px,0)" },
    delay: 400,
    config: config.stiff,
  });

  useChain([headerRef], [0]);

  return (
    <animated.header style={headerProps} className=" text-white p-4 mb-4">
      <div className="flex justify-between items-center mx-7">
        <div>
          <span className="font-extrabold text-5xl text-red-500">Gym</span>'
          <span className="font-extrabold text-5xl">Fitness</span>
        </div>

        {showTabs && (
          <>
            <ul className="flex space-x-9 mr-40">
              <NavItem
                href="/exercises"
                label="Exercícios"
                isActive={isActive === "/exercises"}
              />
              <NavItem
                href="/exercises-schedule"
                label="Cronograma"
                isActive={isActive === "/exercises-schedule"}
              />
              <NavItem
                href="/weights"
                label="Pesos"
                isActive={isActive === "/weights"}
              />
            </ul>
            <LogoutButton />
          </>
        )}
      </div>
    </animated.header>
  );
}

export default Header;
