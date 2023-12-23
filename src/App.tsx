import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputFields from './components/InputFields';

interface InputFields {
  firstName: string;
  lastName: string;
}

const App: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
  } = useForm<InputFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<InputFields> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="max-w-[600px] mx-auto my-10 p-6 bg-sky-50 rounded-md shadow-md">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mb-6 ">Fill data</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFields
          label="Name"
          name="firstName"
          placeholder="Enter name"
          register={register}
          errors={errors}
          isDirty={isDirty}
        />
        <InputFields
          label="Surname"
          name="lastName"
          placeholder="Enter surname"
          register={register}
          errors={errors}
          isDirty={isDirty}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
          focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
