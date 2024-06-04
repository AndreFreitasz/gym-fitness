import React from 'react';
import Header from "../components/header";
import Button from '../components/forms/button';
import ValidatedInputField from '../components/forms/validatedInputField';
import { useSpring, animated } from 'react-spring';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().required('Email é obrigatório'),
    password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem coincidir').required('Confirmação de senha é obrigatório')
});

const Register = () => {

    const AnimatedForm = animated(Form);

    const animationProps = useSpring({
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        from: { opacity: 0, transform: 'translate3d(0,200px,0)' },
        delay: 300
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await axios.post('http://localhost:3001/register', values);
            toast.success("Usuário Cadastrado com sucesso");
            resetForm();
        } catch (error) {
            toast.error("Erro ao tentar cadastrar usuário");
            console.error('Houve um erro ao enviar o formulário:', error);
        }
    };

    return (
        <>
            <Header showTabs={false} />
            <ToastContainer position="bottom-right" />
            <div className="flex justify-center items-center h-screen-72">
                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={schema}
                    validateOnBlur={false}
                    validateOnChange={false}
                    onSubmit={handleSubmit}
                >
                    <AnimatedForm
                        style={animationProps}
                        className="shadow rounded-2xl px-8 pt-6 pb-8 mb-4 w-full mx-auto sm:w-1/2 lg:bg-[#1B2735]"
                    >
                        <h1 className="text-white text-3xl mb-6 text-center font-bold">Cadastro</h1>

                        <div className="flex flex-col justify-content align-center my-6">
                            <ValidatedInputField
                                name="name"
                                id="name"
                                type="text"
                                placeholder="Nome"
                                className="additional-classes"
                            />
                        </div>

                        <div className="flex flex-col justify-content align-center my-6">
                            <ValidatedInputField
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="additional-classes"
                            />
                        </div>
                        <div className="flex flex-col justify-content align-center my-6">
                            <ValidatedInputField
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Senha"
                                className="additional-classes"
                            />
                        </div>
                        <div className="flex flex-col justify-content align-center my-6">
                            <ValidatedInputField
                                name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirme a senha"
                                className="additional-classes"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-12">
                            <a
                                href="/"
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

                    </AnimatedForm>
                </Formik>
            </div>
        </>
    );
}

export default Register