import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Button from "../components/forms/button.js";
import { FaPlus } from 'react-icons/fa';
import ModalWeights from '../components/modalWeights/index.js';
import SimpleTable from '../components/table/index.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Weights = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [exercises, setExercises] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const searchExercises = async () => {
        const idUser = localStorage.getItem('id');
        console.log("id =>", idUser);

        try {
            const response = await axios.get('http://localhost:3001/searchUserData', { params: { idUser } });
            if (response.data.message.length > 0) {
                console.log("response =>", response.data.message);
                setExercises(response.data.message);
            } else {
                console.log("erro");
            }
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
        }
    };

    useEffect(() => {
        searchExercises();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const idUser = localStorage.getItem('id');

        try {
            const response = await axios.post('http://localhost:3001/postWeightRecord', { ...values, idUser });
            if (response.status === 200) {
                closeModal();
                toast.success("Peso cadastrado com sucesso");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Erro ao tentar cadastrar usuário");
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Nome do Exercício',
                accessor: 'name_exercise',
            },
            {
                Header: 'Músculo',
                accessor: 'muscle_group_name',
            },
            {
                Header: 'Peso Recorde',
                accessor: 'record_weight',
            },
        ],
        []
    );

    return (
        <>
            <Header showTabs={true} />
            <ToastContainer position="bottom-right" />
            <div className="flex flex-col justify-center items-center" style={{ maxHeight: `calc(100vh - 100px)` }}>
                <Title>
                    Registre e lembre dos seus pesos Recordes
                </Title>
                <Button
                    colorClass="bg-red-500 hover:bg-red-600"
                    className="flex items-center mt-8 mb-20"
                    onClick={openModal}
                >
                    <FaPlus className="mr-4" />
                    Cadastre os seus pesos recordes
                </Button>
            </div>
            <ModalWeights
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onSubmit={handleSubmit}
                title={"Cadastre os seus pesos recordes"}
            />
            <div className="p-4">
                <SimpleTable columns={columns} data={exercises} />
            </div>
        </>
    );
}

export default Weights;