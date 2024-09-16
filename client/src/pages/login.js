import React from "react";
import Header from "../components/header";
import Button from "../components/forms/button";
import ValidatedInputField from "../components/forms/validatedInputField";
import { useSpring, animated } from "react-spring";
import * as yup from "yup";
import { Formik, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  email: yup.string().required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

const Login = () => {
  const AnimatedForm = animated(Form);
  const navigate = useNavigate();

  const animationProps = useSpring({
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    from: { opacity: 0, transform: "translate3d(0,200px,0)" },
    delay: 300,
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3001/login", values);
      const { data } = response;
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user.id);
      navigate("/exercises");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Usuário ou senha incorretos");
      } else {
        toast.error("Erro ao processar o login");
      }
    }
  };

  return (
    <>
      <Header showTabs={false} />
      <ToastContainer position="bottom-right" />
      <div className="flex justify-center items-center h-screen-72">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={handleSubmit}
        >
          <AnimatedForm
            style={animationProps}
            className="shadow rounded-2xl px-8 pt-6 pb-8 mb-4 w-full mx-auto sm:w-1/2 lg:bg-[#1B2735]"
          >
            <h1 className="text-white text-3xl mb-6 text-center font-bold">
              Login
            </h1>

            <div className="flex flex-col justify-content align-center my-6">
              <ValidatedInputField
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                className="additional- asses"
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
            <div className="flex items-center justify-between mt-12">
              <a
                href="/register"
                className="text-red-500 text-md font-medium cursor-pointer hover:opacity-60 transition-opacity duration-500"
              >
                Não tem uma conta? Se cadastre aqui
              </a>
              <Button
                colorClass="bg-red-500 hover:bg-red-600"
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
};

export default Login;
