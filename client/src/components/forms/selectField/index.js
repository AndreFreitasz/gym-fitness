import React from 'react';
import Select from 'react-select';
import { useField, useFormikContext } from 'formik';

const ValidatedSelectField = ({ placeholder, options, className, label, id, ...props }) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(props);

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
      cursor: 'pointer',
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
    <div className={`mb-4 ${className}`}>
       {label && <label htmlFor={id} className="block text-white text-sm font-semibold mb-4">{label}</label>}
      <Select
        id={id}
        options={options}
        onChange={handleChange}
        placeholder={placeholder || 'Selecione uma opção'}
        value={options.find(option => option.value === field.value) || ''}
        classNamePrefix="react-select"
        styles={customStyles}
      />
      {meta.touched || meta.error ? <div className="text-red-600 text-sm mt-3">{meta.error}</div> : null}
    </div>
  );
};

export default ValidatedSelectField;