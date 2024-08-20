import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSpring, animated } from 'react-spring';
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Button from "../components/forms/button.js";
import ValidatedInputField from "../components/forms/validatedInputField.js";
import ValidatedSelectField from "../components/forms/validatedSelectField.js";
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const schema = yup.object().shape({
  nameExercise: yup.string().required('O nome do exercício é obrigatório.'),
  muscleGroup: yup.number().required('O grupo muscular é obrigatório.')
});

const Exercises = () => {
  const AnimatedForm = animated(Form);
  const [message, setMessage] = useState('');
  const [exercises, setExercises] = useState([]);

  const animationProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    from: { opacity: 0, transform: 'translate3d(0,200px,0)' },
    delay: 300
  });

  const searchExercises = async () => {
    try {
      const response = await axios.get('http://localhost:3001/searchExercises');
      if (response.data.message.length > 0) {
        setExercises(response.data.message);
        setMessage('');
      } else {
        setMessage('Nenhum exercício cadastrado!');
      }
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    searchExercises();
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
        searchExercises();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao tentar cadastrar usuário");
      }
    }
  };

  const deleteExercise = (id) => async () => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'bg-gray-800 text-white', 
        title: 'font-bold', 
        confirmButton: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded', 
        cancelButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' 
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete('http://localhost:3001/deleteExercises', { data: { id } });
          if (response.status === 200) {
            toast.success('Exercício deletado com sucesso!');
            searchExercises();
          }
        } catch (error) {
          if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Erro ao tentar deletar exercício");
          }
        }
      }
    });
  }

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
          <div className="flex justify-center w-full h-screen mt-6">
            <div className="overflow-auto rounded-lg w-4/5 max-h-[60vh] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent custom-scrollbar">

              {message ? (
                <p className="text-white bg-red-400 p-3 font-semibold rounded-md">{message}</p>
              ) : (

                <ul className="flex flex-col w-full mb-16">
                  {exercises.map((exercise) => (
                    <li
                      className="text-white text-lg bg-background rounded-md mx-4 p-1 my-1 flex justify-between items-center"
                      key={exercise.id}
                    >
                      <span className="flex-grow border-r-2 border-gray-500 pl-6 py-2">
                        {exercise.name_exercise}
                      </span>
                      <div
                        className=" flex p-4 ml-3 items-center cursor-pointer rounded-md hover:bg-red-500 transition duration-200 ease-in-out"
                        title="Deletar"
                        onClick={deleteExercise(exercise.id)}
                      >
                        <FaTrash className=" h-full flex-shrink-0" />
                      </div>
                    </li>
                  ))}
                </ul>

              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;