import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputFields from './components/InputFields';
import SelectField from './components/SelectField';
import PokemonDetails from './components/PokemonDetails';

interface InputFieldsData {
  firstName: string;
  lastName: string;
  selectedItems: any[];
}

const App: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    control,
    watch
  } = useForm<InputFieldsData>({ mode: 'onChange' });

  const selectedItems = watch('selectedItems', []);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit: SubmitHandler<InputFieldsData> = (data) => {
        console.log(data);
        reset({
          firstName: '',
          lastName: '',
          selectedItems: [],
        });
      }

  return (
    <div className="max-w-[600px] mx-auto my-10 p-6 bg-sky-50 rounded-md shadow-md">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">
          Open Form
        </button>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="text-3xl font-semibold mb-6 ">Fill data</h1>
            <button
              onClick={() => setIsFormOpen(false)}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            </button>
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

            <SelectField control={control} name="selectedItems" label="Pokemons" />

            <PokemonDetails
              selectedPokemons={selectedItems.map((pokemon) => ({
                value: pokemon.value,
                label: pokemon.label,
                image: pokemon.image,
              }))}
            />

            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 
              focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
