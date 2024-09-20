import React, { useEffect, useState } from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Carousel from "../components/carousel/index.js";
import Button from "../components/forms/button.js";
import { FaPlus, FaTrash } from "react-icons/fa";
import ModalSchedules from "../components/modalSchedules/index.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ExercisesSchedule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [exercisesByDay, setExercisesByDay] = useState({});
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  const idUser = localStorage.getItem("id");

  useEffect(() => {
    searchExercisesSchedule();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const searchExercisesSchedule = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/searchExercisesSchedule",
        {
          params: { idUser },
        },
      );
      setExercisesByDay(response.data.message);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao tentar buscar exercícios");
      }
    }
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
        searchExercisesSchedule(); // Atualize a lista de exercícios após a inserção
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao tentar cadastrar peso");
      }
    }
  };

  const deleteExercise = async (exerciseId) => {
    try {
      await axios.delete(`http://localhost:3001/deleteExercise/${exerciseId}`);
      toast.success("Exercício deletado com sucesso");
      searchExercisesSchedule(); // Atualize a lista de exercícios após a exclusão
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao tentar deletar exercício");
      }
    }
  };

  return (
    <>
      <Header showTabs={true} />
      <ToastContainer position="bottom-right" />
      <div className="flex items-center justify-center mt-24">
        <div className="p-5 bg-gray-500 bg-opacity-20 rounded-lg w-3/4 h-[72vh]">
          <Carousel>
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <div className="w-[90%] p-5 flex flex-col items-center justify-center">
                  <Title className="text-4xl mb-8 text-white">{day}</Title>
                  <Button
                    colorClass="bg-red-500 hover:bg-red-600"
                    className="flex items-center"
                    onClick={openModal}
                  >
                    <FaPlus className="mr-2" /> Inserir exercício
                  </Button>

                  <div className="flex justify-center w-full mt-6">
                    <div className="overflow-auto rounded-lg w-4/5 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent custom-scrollbar">
                      <ul className="flex flex-col w-full mb-16">
                        {exercisesByDay[day] &&
                          exercisesByDay[day].map((exercise, id) => (
                            <li
                              className="text-white text-lg bg-background rounded-md mx-4 p-1 my-1 flex justify-between items-center"
                              key={id}
                            >
                              <span className="flex-grow border-r-2 border-gray-500 pl-6 py-2">
                                {exercise.name_exercise} - {exercise.series} x{" "}
                                {exercise.repetitions}
                              </span>
                              <div
                                className=" flex p-4 ml-3 items-center cursor-pointer rounded-md hover:bg-red-500 transition duration-200 ease-in-out"
                                title="Deletar"
                                onClick={() => deleteExercise(exercise.id)}
                              >
                                <FaTrash className=" h-full flex-shrink-0" />
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
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
