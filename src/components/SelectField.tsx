import React, { useEffect, useState } from 'react';
import { Controller} from 'react-hook-form';
import ReactSelect from 'react-select';

interface IOption {
  value: string;
  label: string;
  image: string;
}

interface SelectProps {
  control: any;
  name: string;
  label: string;
}

const SelectField: React.FC<SelectProps> = ({ control, name, label }) => {
  const [pokemonOptions, setPokemonOptions] = useState<IOption[]>([]);

  useEffect(() => {
    const fetchPokemonOptions = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        const options: IOption[] = data.results.map((pokemon: any) => ({
          value: pokemon.name,
          label: pokemon.name,
          image: `https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`,
        }));
        setPokemonOptions(options);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonOptions();
  }, []);

  const customOption = ({ innerProps, label, data }: any) => (
    <div {...innerProps}>
      <img src={data.image} alt={label} className="w-8 h-8 rounded-full mr-2" />
      {label}
    </div>
  );

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value: IOption[]) => value.length === 4 || "Please, select exactly 4 Pokemons!",
          required: `${label} is a required field!`,
          max: 4,
        }}
        render={({ field, fieldState }) => (
          <div className="mt-4">
            <label htmlFor={name} className="text-base font-medium text-gray-600">{label}</label>
            <ReactSelect
              placeholder="Choose Pokemons"
              options={pokemonOptions}
              isMulti
              components={{ Option: customOption }}
              value={field.value}
              onChange={(value, actionMeta) => {
                if (actionMeta.action === 'select-option' && value.length > 4) {
                  return; 
                }
                const selectedItems = value as IOption[];
                field.onChange(selectedItems);
              }}
            />
            {fieldState.error && <div className="text-red-600">{fieldState.error.message}</div>}
          </div>
        )}
      />
    </div>
  );
};

export default SelectField;
