import React, { useState } from 'react';
import Header from "../components/header";
import InputField from "../components/forms/InputField";
import Button from '../components/forms/button';
import { useSpring, animated } from 'react-spring';
import * as yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('Email é obrigatório'),
    password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem coincidir')
});

const Register = () => {

    const animationProps = useSpring({
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        from: { opacity: 0, transform: 'translate3d(0,200px,0)' },
        delay: 300
    });

    const handleSubmit = async (values) => {
        try {
          const response = await axios.post('/api/register', values);
          console.log(response.data);
        } catch (error) {
          console.error('Houve um erro ao enviar o formulário:', error);
        }
      };

        return (
            <>
                <Header showTabs={false} />

                <div className="flex justify-center items-center h-screen-72">
                    <Formik
                        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <animated.form
                                style={animationProps}
                                className="shadow rounded-2xl px-8 pt-6 pb-8 mb-4 w-full mx-auto sm:w-1/2 lg:bg-[#1B2735]"
                            >
                                <h1 className="text-white text-3xl mb-6 text-center font-bold">Cadastro</h1>

                                <div className="flex flex-row justify-content align-center my-6">
                                    <InputField
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="Nome"
                                        className="additional-classes"
                                    />

<ErrorMessage name="name" component="div" />
                                </div>

                                <div className="flex flex-row justify-content align-center my-6">
                                    <InputField
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        className="additional-classes"
                                    />
                                </div>
                                <div className="flex flex-row justify-content align-center my-6">
                                    <InputField
                                        name="password"
                                        id="password"
                                        type="password"
                                        placeholder="Senha"
                                        className="additional-classes"
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div className="flex flex-row justify-content align-center my-6">
                                    <InputField
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirme a senha"
                                        className="additional-classes"
                                        autoComplete="current-password"
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-12">
                                    <a
                                        href="/login"
                                        className="text-red-500 text-md font-medium cursor-pointer hover:opacity-60 transition-opacity duration-500"
                                    >
                                        Já é cadastrado? Entre na sua conta
                                    </a>
                                    <Button
                                        className="additional-classes"
                                        type="submit"
                                    >
                                        Entrar
                                    </Button>
                                </div>

                            </animated.form>
                        )}
                    </Formik>
                </div>
            </>
        );
    }

    export default Register