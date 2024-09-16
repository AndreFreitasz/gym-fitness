import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSpring, animated } from "@react-spring/web";
import { FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

Modal.setAppElement("#root");

const ModalViewWeights = ({ isOpen, onRequestClose, title, rowData }) => {
  const [weightsData, setWeightsData] = useState([]);

  const parseWeight = (weight) => {
    return parseFloat(weight.replace(" kg", ""));
  };

  const maxWeight =
    weightsData.length > 0
      ? Math.max(
          ...weightsData.map((weight) => parseWeight(weight.record_weight)),
        )
      : null;

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0%)" : "translateY(-50%)",
    config: { tension: 300, friction: 20 },
  });

  const searchDatesWeightsByExercise = async () => {
    const idUser = localStorage.getItem("id");
    const idExercise = rowData.id_exercise;

    try {
      const response = await axios.get(
        "http://localhost:3001/searchDatesWeightsByExercise",
        { params: { idUser, idExercise } },
      );
      if (response.data.message.length > 0) {
        setWeightsData(response.data.message);
      } else {
        console.log("Erro ao buscar dados do usuário");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário: ", error);
    }
  };

  useEffect(() => {
    if (rowData) {
      searchDatesWeightsByExercise();
    }
  }, [rowData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal para visualizar pesos"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{ overlay: { transition: "opacity 0.3s ease" } }}
    >
      <animated.div
        style={animation}
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl"
      >
        <header className="border-b border-red-500 pb-3 mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button onClick={onRequestClose} className="text-white">
            <FaTimes size={20} />
          </button>
        </header>
        <div>
          {rowData ? (
            <>
              <p className="text-white text-3xl font-bold text-center">
                {rowData.name_exercise}
              </p>
              <div className="mt-4">
                {weightsData.length > 0 ? (
                  <>
                    <div className="flex justify-around text-white font-semibold mb-2 text-2xl">
                      <span className="inline-block border-b-4 rounded-b-sm border-red-500">
                        Data
                      </span>
                      <span className="inline-block border-b-4 rounded-b-sm border-red-500">
                        Peso
                      </span>
                    </div>
                    <ul className="flex justify-around mt-5 mr-3">
                      <div className="flex flex-col items-center">
                        {weightsData.map((weight, index) => (
                          <span key={index} className="text-white mb-5 text-lg">
                            {weight.record_weight_date}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col items-center">
                        {weightsData.map((weight, index) => (
                          <span
                            key={index}
                            className={`text-white mb-5 text-lg px-2 rounded-md 
                                                            ${
                                                              parseWeight(
                                                                weight.record_weight,
                                                              ) === maxWeight
                                                                ? "bg-green-500"
                                                                : "bg-red-500"
                                                            }`}
                          >
                            {weight.record_weight}
                          </span>
                        ))}
                      </div>
                    </ul>
                  </>
                ) : (
                  <p className="text-white">Nenhum dado encontrado.</p>
                )}
              </div>
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </animated.div>
    </Modal>
  );
};

export default ModalViewWeights;
