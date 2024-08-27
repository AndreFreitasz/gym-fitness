import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from '@react-spring/web';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ValidatedSelectField from '../forms/selectField';
import useFetchOptions from '../forms/selectField/useFetchOptions';
import ValidatedInputField from '../forms/validatedInputField';
import Button from '../forms/button';

Modal.setAppElement('#root');

const ModalWeights = ({ isOpen, onRequestClose, children, title }) => {
    const idUser = localStorage.getItem('id');
    const urlSearchExercises = 'http://localhost:3001/searchExercises';

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

    const initialValues = {
        exercises: '',
        dateField: '',
        numberField: '',
    };

    const validationSchema = Yup.object({
        exercises: Yup.string().required('Campo obrigatório'),
        dateField: Yup.date().required('Campo obrigatório'),
        numberField: Yup.number().required('Campo obrigatório').typeError('Deve ser um número'),
    });

    const handleSubmit = (values) => {
        console.log('Form data', values);
        onRequestClose();
    };

    return (
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
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
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
                                        id="numberField"
                                        name="numberField"
                                        label="Peso (kg):"
                                        className="w-full"
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <ValidatedInputField
                                        type="date"
                                        id="dateField"
                                        name="dateField"
                                        label="Data:"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <Button type="submit" className="bg-white-">
                                Enviar
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Button
                    onClick={onRequestClose}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                    Fechar
                </Button>
            </animated.div>
        </Modal>
    );
};

export default ModalWeights;