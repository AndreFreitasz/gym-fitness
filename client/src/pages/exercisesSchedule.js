import React, { useState } from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Carousel from "../components/carousel/index.js";
import Button from "../components/forms/button.js";
import { FaPlus } from "react-icons/fa";
import ModalSchedules from "../components/modalSchedules/index.js";
import axios from "axios";
import { toast } from "react-toastify";

const ExercisesSchedule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (values, { resetForm }) => {
    const idUser = localStorage.getItem("id");

    try {
      const response = await axios.post(
        "http://localhost:3001/postExerciseSchedule",
        { ...values, idUser },
      );
      if (response.status === 200) {
        closeModal();
        toast.success("Peso cadastrado com sucesso");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao tentar cadastrar peso");
      }
    }
  };

  return (
    <>
      <Header showTabs={true} />
      <div className="flex items-center justify-center mt-24">
        <div className="p-5 bg-gray-500 bg-opacity-20 rounded-lg w-3/4 h-[72vh]">
          <Carousel>
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <div className="w-[90%] p-5 flex flex-col items-center justify-center">
                  <Title className="text-4xl mb-2 text-white">{day}</Title>
                  <div className="w-full flex justify-center mt-2">
                    <Button
                      colorClass="bg-red-500 hover:bg-red-600"
                      className="flex items-center"
                      onClick={openModal}
                    >
                      <FaPlus className="mr-2" /> Inserir exercício
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <ModalSchedules
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSubmit={handleSubmit}
        title={"Cadastre os seus pesos recordes"}
      />
    </>
  );
};

export default ExercisesSchedule;
