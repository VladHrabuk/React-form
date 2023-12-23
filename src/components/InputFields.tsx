import {FC} from "react"

interface InputFieldProps {
    label: string;
    name: string;
    placeholder: string;
    register: any;
    errors: any;
    isDirty: boolean;
  }

const InputFields: FC<InputFieldProps> = ({ label, name, placeholder, register, errors, isDirty }) => {
    return(
        <div className="mt-4">
            <label htmlFor={name} className="text-base font-medium text-gray-600">
            {label}
            </label>
            <input
            {...register(name, { required: `${label} is a required field!`,
            minLength: {
                value: 2,
                message: `${label} must be at least 2 characters long!`,
              },
              maxLength: {
                value: 12,
                message: `${label} must be at most 12 characters long!`,
              }, 
              pattern: {
                value: /^[A-Za-z]+$/,
                message: `${label} must contain only letters!`,
              },
            })}
            className={`mt-2 p-2 w-full border rounded-md focus:outline-none ${
                isDirty ? (errors[name] ? 'border-red-500' : 'border-blue-500') : 'border-gray-300'
              }`}
              id={name}
              type="text"
              placeholder={placeholder}
            />
            {errors[name] && isDirty && <div className="text-red-500 text-base">{errors[name].message}</div>}
          </div>

    )
}

export default InputFields;