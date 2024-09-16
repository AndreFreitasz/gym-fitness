import React from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Carousel from "../components/carousel/index.js";
import Button from "../components/forms/button.js";
import { FaPlus } from "react-icons/fa";

const ExercisesSchedule = () => {
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  return (
    <>
      <Header showTabs={true} />
      <div className="flex items-center justify-center mt-24">
        <div className="p-5 bg-gray-500 bg-opacity-20 rounded-lg w-3/4 h-[72vh]">
          <Carousel>
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="w-full h-full flex items-center justify-center"
              >
                <Title className="text-4xl">{day}</Title>
                <Button
                  colorClass="bg-red-500 hover:bg-red-600"
                  className="px-6 flex justify-center items-center"
                >
                  <FaPlus className="mr-2" /> Inserir exercício para esse dia
                </Button>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ExercisesSchedule;
