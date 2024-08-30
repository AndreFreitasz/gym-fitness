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
import Swal from "sweetalert2";

const Weights = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [exercises, setExercises] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const searchUserData = async () => {
        const idUser = localStorage.getItem('id');

        try {
            const response = await axios.get('http://localhost:3001/searchUserData', { params: { idUser } });
            if (response.data.message.length > 0) {
                setExercises(response.data.message);
            } else {
                console.log("erro");
            }
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
        }
    };

    useEffect(() => {
        searchUserData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const idUser = localStorage.getItem('id');

        try {
            const response = await axios.post('http://localhost:3001/postWeightRecord', { ...values, idUser });
            if (response.status === 200) {
                closeModal();
                toast.success("Peso cadastrado com sucesso");
                searchUserData();
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
                Header: 'Data do Recorde',
                accessor: 'record_weight_date',
            },
            {
                Header: 'Peso Recorde',
                accessor: 'record_weight',
            },
        ],
        []
    );

    const handleDelete = () => {
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
                const response = await axios.delete('http://localhost:3001/deleteRecordsWeights');
                if (response.status === 200) {
                  toast.success('Exercício deletado com sucesso!');
                  searchUserData();
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
    };

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
            <SimpleTable 
                columns={columns} 
                data={exercises} 
                onDelete={handleDelete} 
            />
        </>
    );
}

export default Weights;