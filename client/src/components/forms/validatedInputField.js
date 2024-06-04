import InputField from './InputField';
import { useField } from 'formik';

function ValidatedInputField({ className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      <InputField {...field} {...props} className={`${className} ${meta.error ? 'border-b-2 border-red-500' : 'border-b border-gray-600'}`} />
      {meta.error && meta.touched ? <div className="text-red-700 text-sm mt-3">{meta.error}</div> : null}
    </div>
  );
}

export default ValidatedInputField;