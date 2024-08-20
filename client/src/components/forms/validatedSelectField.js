import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';
import axios from 'axios';

const ValidatedSelectField = ({ placeholder, url, className, label, id, ...props }) => {
  const [options, setOptions] = useState([]);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(url);
        const formattedOptions = response.data.message.map(option => ({
          value: option.id,
          label: option.group_muscle
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };
    fetchOptions();
  }, [url]);

  const handleChange = (selectedOption) => {
    setFieldValue(props.name, selectedOption ? selectedOption.value : '');
    setFieldTouched(props.name, true);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#1B2735',
      borderColor: 'transparent',
      borderBottomColor: meta.touched && meta.error ? 'rgb(239 68 68)' : 'transparent',
      boxShadow: 'none',
      color: 'white',
      padding: '0.30rem',
      '&:hover': {
        borderColor: 'transparent',
        borderBottomColor: meta.touched && meta.error ? 'rgb(239 68 68)' : 'transparent',
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1B2735',
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'grey' : '#1B2735',
      color: 'white',
      '&:hover': {
        backgroundColor: 'grey'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
  };

  return (
    <div className={`mb-4 ${className}`}>
       {label && <label htmlFor={id} className="block text-white text-sm font-semibold mb-4">{label}</label>}
      <Select
        id={id}
        options={options}
        onChange={handleChange}
        placeholder={placeholder || 'Selecione o grupo muscular do exercício'}
        value={options.find(option => option.value === field.value) || ''}
        classNamePrefix="react-select"
        styles={customStyles}
      />
      {meta.touched || meta.error ? <div className="text-red-600 text-sm mt-3">{meta.error}</div> : null}
    </div>
  );
};

export default ValidatedSelectField;