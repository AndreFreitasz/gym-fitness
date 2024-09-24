import React, { useCallback } from "react";
import Modal from "react-modal";
import { useSpring, animated } from "@react-spring/web";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ValidatedSelectField from "../forms/selectField";
import useFetchOptions from "../forms/selectField/useFetchOptions";
import ValidatedInputField from "../forms/validatedInputField";
import Button from "../forms/button";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const schema = Yup.object().shape({
  exercises: Yup.string().required("Campo obrigatório"),
  daysOfWeek: Yup.string().required("Campo obrigatório"),
  series: Yup.number().required("Campo obrigatório"),
  repetitions: Yup.number().required("Campo obrigatório"),
});

const ModalSchedules = ({ isOpen, onRequestClose, title, onSubmit }) => {
  const idUser = localStorage.getItem("id");
  const urlSearchExercises = "http://localhost:3001/searchExercises";
  const urlSearchDaysOfWeek = "http://localhost:3001/searchDaysOfWeek";

  const initialValues = {
    exercises: "",
    daysOfWeek: "",
    series: "",
    repetitions: "",
  };

  const formatOptionExercises = useCallback(
    (option) => ({
      value: option.id,
      label: option.name_exercise,
    }),
    [],
  );
  const formatOptionDaysOfWeek = useCallback(
    (option) => ({
      value: option.id,
      label: option.name_day,
    }),
    [],
  );

  const exercisesOptions = useFetchOptions(
    urlSearchExercises,
    formatOptionExercises,
    {
      idUser: idUser,
    },
  );
  const daysOfWeekOptions = useFetchOptions(
    urlSearchDaysOfWeek,
    formatOptionDaysOfWeek,
  );

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0%)" : "translateY(-50%)",
    config: { tension: 300, friction: 20 },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal para cadastrar pesos recordes"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{ overlay: { transition: "opacity 0.3s ease" } }}
      >
        <animated.div
          style={animation}
          className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl"
        >
          <header className="border-b border-red-500 pb-3 mb-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </header>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="my-6">
                <ValidatedSelectField
                  id="exercises"
                  name="exercises"
                  options={exercisesOptions}
                  label="Selecione o exercicio no qual quer cadastrar o peso: "
                />
                <ValidatedSelectField
                  id="daysOfWeek"
                  name="daysOfWeek"
                  options={daysOfWeekOptions}
                  label="Selecione o dia da semana: "
                />
              </div>
              <div className="mb-4 flex items-center">
                <div className="w-1/2 mr-4 flex row justify-end">
                  <span className="mr-2 flex items-center text-white text-sm font-semibold">
                    Séries:
                  </span>
                  <ValidatedInputField
                    type="number"
                    id="series"
                    name="series"
                    placeholder="00"
                    className="w-2/4"
                  />
                </div>
                <div className="w-1/2 mr-4 flex row justify-start">
                  <span className="mr-2 flex items-center text-white text-sm font-semibold">
                    Repetições:
                  </span>
                  <ValidatedInputField
                    type="number"
                    id="repetitions"
                    name="repetitions"
                    placeholder="00"
                    className="w-2/4"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={onRequestClose}
                  colorClass="bg-red-500 hover:bg-red-600"
                >
                  Fechar
                </Button>
                <Button
                  type="submit"
                  colorClass="bg-blue-700 hover:bg-blue-800"
                >
                  Enviar
                </Button>
              </div>
            </Form>
          </Formik>
        </animated.div>
      </Modal>
    </>
  );
};

export default ModalSchedules;
