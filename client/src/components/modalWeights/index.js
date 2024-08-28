import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from '@react-spring/web';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ValidatedSelectField from '../forms/selectField';
import useFetchOptions from '../forms/selectField/useFetchOptions';
import ValidatedInputField from '../forms/validatedInputField';
import Button from '../forms/button';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

const schema = Yup.object().shape({
    exercises: Yup.string().required('Campo obrigatório'),
    recordsWeights: Yup.number().required('Campo obrigatório').typeError('Deve ser um número'),
    dateOfRecordWeight: Yup.date().required('Campo obrigatório'),
});

const ModalWeights = ({ isOpen, onRequestClose, children, title, onSubmit }) => {
    const idUser = localStorage.getItem('id');
    const urlSearchExercises = 'http://localhost:3001/searchExercises';

    const initialValues = {
        exercises: '',
        recordsWeights: '',
        dateOfRecordWeight: ''
    }

    const formatOption = useCallback(option => ({
        value: option.id,
        label: option.name_exercise
    }), []);

    const exercisesOptions = useFetchOptions(
        urlSearchExercises,
        formatOption,
        { idUser: idUser }
    );

    const animation = useSpring({
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0%)' : 'translateY(-50%)',
        config: { tension: 300, friction: 20 },
    });

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Exemplo de Modal"
                className="fixed inset-0 flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                style={{ overlay: { transition: 'opacity 0.3s ease' } }}
            >
                <animated.div style={animation} className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-4xl">
                    <header className="border-b border-red-500 pb-3 mb-4">
                        <h2 className="text-xl font-semibold text-white">{title}</h2>
                    </header>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={schema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="my-12">
                                <ValidatedSelectField
                                    id="exercises"
                                    name="exercises"
                                    options={exercisesOptions}
                                    label="Selecione o exercicio no qual quer cadastrar o peso: "
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <div className="w-1/2 mr-4">
                                    <ValidatedInputField
                                        type="number"
                                        id="recordsWeights"
                                        name="recordsWeights"
                                        label="Peso (kg):"
                                        className="w-full"
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <ValidatedInputField
                                        type="date"
                                        id="dateOfRecordWeight"
                                        name="dateOfRecordWeight"
                                        label="Data:"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Button onClick={onRequestClose} colorClass="bg-red-500 hover:bg-red-600">
                                    Fechar
                                </Button>
                                <Button type="submit" colorClass="bg-blue-700 hover:bg-blue-800">
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </animated.div>
            </Modal>
        </>
    );
};

export default ModalWeights;