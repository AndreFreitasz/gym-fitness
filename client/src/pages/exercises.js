import React from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Button from "../components/forms/button.js";
import ValidatedInputField from "../components/forms/validatedInputField.js";
import { useSpring, animated } from 'react-spring';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ValidatedSelectField from "../components/forms/validatedSelectField.js";


const schema = yup.object().shape({
  nameExercise: yup.string().required('O nome do exercício é obrigatório.'),
  muscleGroup: yup.number()
                   .required('O grupo muscular é obrigatório.')
                   .integer('O grupo muscular deve ser um número inteiro.')
});

const Exercises = () => {
  const AnimatedForm = animated(Form);

  const animationProps = useSpring({
    to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
    from: { opacity: 0, transform: 'translate3d(0,200px,0)' },
    delay: 300
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/postExercises', values);
      console.log(response)
      if (response.status === 201) {
        toast.success('Exercício cadastrado com sucesso!');
      }
    } catch (error) {
      toast.error('Infelizmente ocorreu um erro, tente novamente mais tarde!');
    }
  };

  return (
    <>
      <Header showTabs={true} />
      <div className="flex justify-start items-center shadow-lg p-6" style={{ height: `calc(100vh - 100px)` }}>
        <div className="w-full max-w-7xl overflow-auto bg-gray-500 bg-opacity-20 rounded-lg flex flex-col items-center min-h-64 h-full relative" style={{ maxWidth: '50%' }}>
          <Title>
            Cadastre seus exercícios
          </Title>
          <Formik
            initialValues={{ nameExercise: '' }}
            validationSchema={schema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={handleSubmit}
          >
            <AnimatedForm                                                                                                                                                                                                                                       
              style={animationProps}
              className="w-full max-                                                                                                                                                                                                                                                                w-2xl mt-4 flex flex-col h-full p-12"
            >
              <div className="mb-10">
                <ValidatedInputField
                  name="nameExercise"
                  id="nameExercise"
                  type="text"
                  placeholder="Registre o nome do exercício"
                  className="additional- asses"
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
                <Button>
                  Cadastrar
                </Button>
              </div>
            </AnimatedForm>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Exercises;