import React from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Carousel from "../components/carousel/index.js"; 

const ExercisesSchedule = () => {
  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  return (
    <>
      <Header showTabs={true} />
      <div className="flex items-center justify-center mt-24">
        <div className="p-5 bg-gray-500 bg-opacity-20 rounded-lg w-3/4 h-[72vh]">
          <Carousel>
            {daysOfWeek.map((day, index) => (
              <div key={index} className="w-full h-full flex items-center justify-center">
                <Title className="text-4xl">
                  {day}
                </Title>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default ExercisesSchedule;