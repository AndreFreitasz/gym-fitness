import React, { useEffect, useState } from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Button from "../components/forms/button.js";
import ValidatedInputField from "../components/forms/validatedInputField.js";
import { useSpring, animated } from 'react-spring';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ValidatedSelectField from "../components/forms/validatedSelectField.js";


const schema = yup.object().shape({
  nameExercise: yup.string().required('O nome do exercício é obrigatório.'),
  muscleGroup: yup.number().required('O grupo muscular é obrigatório.')
});

const Exercises = () => {
  const AnimatedForm = animated(Form);
  const [exercises, setExercises] = useState([]);

  const animationProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    from: { opacity: 0, transform: 'translate3d(0,200px,0)' },
    delay: 300
  });

  const fetchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:3001/searchExercises');
      setExercises(response.data.message);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const initialValues = {
    nameExercise: '',
    muscleGroup: ''
  }

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:3001/postExercises', values);
      console.log(response)
      if (response.status === 200) {
        toast.success('Exercício cadastrado com sucesso!');
        resetForm({ values: initialValues });
        fetchExercises();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao tentar cadastrar usuário");
      }
    }
  };

  return (
    <>
      <Header showTabs={true} />
      <ToastContainer position="bottom-right" />
      <div className="flex flex-col lg:flex-row justify-start items-stretch shadow-lg p-6 gap-x-4 gap-y-4 lg:gap-y-0" style={{ maxHeight: `calc(100vh - 100px)` }}>
        <div className="w-full overflow-auto rounded-lg flex flex-col items-center relative overflow-hidden sm:max-w-full md:max-w-full lg:w-1/2 lg:bg-gray-500 lg:bg-opacity-20">
          <Title>
            Cadastre seus exercícios
          </Title>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            <AnimatedForm
              style={animationProps}
              className="w-full max-w-2xl mt-4 flex flex-col p-12"
            >
              <div className="mb-10">
                <ValidatedInputField
                  name="nameExercise"
                  id="nameExercise"
                  type="text"
                  placeholder="Registre o nome do exercício"
                  className="additional-classes"
                  label="Nome do exercício: "
                />
              </div>
              <div className="mb-10">
                <ValidatedSelectField
                  id="muscleGroup"
                  name="muscleGroup"
                  url="http://localhost:3001/searchGroupsMuscles"
                  label="Grupo Muscular: "
                />
              </div>
              <div className="mt-auto flex justify-end">
                <Button type="submit">
                  Cadastrar
                </Button>
              </div>
            </AnimatedForm>
          </Formik>
        </div>
        <div className="w-full rounded-lg flex flex-col items-center relative sm:max-w-full md:max-w-full lg:w-1/2 lg:bg-gray-500 lg:bg-opacity-20 overflow-hidden" >
          <Title>
            Seus exercícios
          </Title>
          <div className="flex items-center justify-center w-full h-screen">
            <div 
              className="overflow-auto rounded-lg shadow w-4/5 max-h-[60vh] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent custom-scrollbar"
            >
              <ul className="flex flex-col w-full mb-16">
                {exercises.map((exercise) => (
                  <li
                    className="text-white text-lg bg-background p-3 rounded-md mx-4 my-1"
                    key={exercise.id}
                  >
                    {exercise.name_exercise}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;