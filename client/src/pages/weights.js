import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/header/index.js";
import Title from "../components/title/index.js";
import Button from "../components/forms/button.js";
import { FaPlus } from 'react-icons/fa';
import ModalWeights from '../components/modalWeights/index.js';
import ModalViewWeights from '../components/modalWeights/viewWeights.js';
import TableDataWeights from '../components/table/index.js';
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/customStylesFilters.css';

const Weights = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [filter, setFilter] = useState({
        exercise: '',
        date: '',
        muscleGroup: ''
    });

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const infoOpenModal = (row) => {
        setSelectedRow(row);
        setInfoModalIsOpen(true);
    };

    const infoCloseModal = () => {
        setInfoModalIsOpen(false);
        setSelectedRow(null);
    };

    const searchUserData = async () => {
        const idUser = localStorage.getItem('id');

        try {
            const response = await axios.get('http://localhost:3001/searchUserData', { params: { idUser } });
            if (response.data.message.length > 0) {
                setExercises(response.data.message);
                setFilteredExercises(response.data.message);
            } else {
                console.log("Erro ao buscar dados do usuário");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do usuário: ", error);
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
                toast.error("Erro ao tentar cadastrar peso");
            }
        }
    };

    useEffect(() => {
        const filtered = exercises.filter(exercise => {
            return (
                (filter.exercise === '' || exercise.name_exercise === filter.exercise) &&
                (filter.date === '' || exercise.record_weight_date === filter.date) &&
                (filter.muscleGroup === '' || exercise.muscle_group_name === filter.muscleGroup)
            );
        });
        setFilteredExercises(filtered);
    }, [filter, exercises]);

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

    const handleDelete = (id) => {
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
                    const response = await axios.delete('http://localhost:3001/deleteWeightRecord', { data: { id } });
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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const uniqueExercises = [...new Set(exercises.map(exercise => exercise.name_exercise))];
    const uniqueDates = [...new Set(exercises.map(exercise => exercise.record_weight_date))];
    const uniqueMuscleGroups = [...new Set(exercises.map(exercise => exercise.muscle_group_name))];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#1B2735',
            borderColor: 'transparent',
            boxShadow: 'none',
            color: 'white',
            padding: '0.30rem',
            cursor: 'pointer',
            '&:hover': {
                borderColor: 'transparent',
            }
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1B2735',
            color: 'white',
        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            backgroundColor: state.isSelected ? 'rgba(27, 39, 45)' : '#1B2735',
            color: 'white',
            '&:hover': {
                backgroundColor: 'rgba(27, 39, 45)'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
        input: (provided) => ({
            ...provided,
            color: '#fff',
        }),
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
                <div className="flex mb-4 ml-8">
                    <p className="text-white text-sm font-bold mr-3">Filtrar por: </p>
                    <div className="flex space-x-2">
                        <select
                            name="exercise"
                            value={filter.exercise}
                            onChange={handleFilterChange}
                            className="p-1 custom-select text-xs"
                        >
                            <option value="">Todos os Exercícios</option>
                            {uniqueExercises.map((exercise, index) => (
                                <option key={index} value={exercise}>{exercise}</option>
                            ))}
                        </select>
                        <select
                            name="date"
                            value={filter.date}
                            onChange={handleFilterChange}
                            className="p-1 custom-select text-xs"
                        >
                            <option value="">Todas as Datas</option>
                            {uniqueDates.map((date, index) => (
                                <option key={index} value={date}>{date}</option>
                            ))}
                        </select>
                        <select
                            name="muscleGroup"
                            value={filter.muscleGroup}
                            onChange={handleFilterChange}
                            className="p-1 custom-select text-xs"
                        >
                            <option value="">Todos os Grupos Musculares</option>
                            {uniqueMuscleGroups.map((muscleGroup, index) => (
                                <option key={index} value={muscleGroup}>{muscleGroup}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <ModalWeights
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onSubmit={handleSubmit}
                title={"Cadastre os seus pesos recordes"}
            />
            <TableDataWeights
                columns={columns}
                data={filteredExercises}
                onDelete={handleDelete}
                onInfo={infoOpenModal}
            />
            <ModalViewWeights
                title={"Pesos cadastrados do exercício"}
                isOpen={infoModalIsOpen}
                onRequestClose={infoCloseModal}
                rowData={selectedRow}
            />
        </>
    );
}

export default Weights;