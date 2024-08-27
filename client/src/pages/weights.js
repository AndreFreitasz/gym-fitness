import React, { useState } from "react";
import Header from "../components/header/index.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Title from "../components/title/index.js";
import Button from "../components/forms/button.js";
import { FaPlus } from 'react-icons/fa';
import ModalWeights from '../components/modalWeights/index.js';

const Weights = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <Header showTabs={true} />
            <ToastContainer position="bottom-right" />
            <div className="flex flex-col justify-center items-center" style={{ maxHeight: `calc(100vh - 100px)` }}>
                <Title>
                    Registre e lembre dos seus pesos Recordes
                </Title>
                <Button className="flex items-center my-8" onClick={() => { console.log('Button clicked'); openModal(); }}>
                    <FaPlus className="mr-4" />
                    Cadastre os seus pesos recordes
                </Button>
            </div>
            <ModalWeights
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                title={"Cadastre os seus pesos recordes"}
            >
            </ModalWeights>
        </>
    );
}

export default Weights;