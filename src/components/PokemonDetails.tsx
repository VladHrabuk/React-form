import { FC } from 'react';

interface PokemonDetailsProps {
  selectedPokemons: any[];
}

const PokemonDetails: FC<PokemonDetailsProps> = ({ selectedPokemons }) => {
  return (
    <div className="flex flex-wrap">
      {selectedPokemons.map((pokemon) => (
        <div key={pokemon.value} className="w-1/2 p-2">
          <div className="border p-4 my-2">
            <h2 className="text-center text-base text-gray-600">{pokemon.label}</h2>
            <img src={pokemon.image} alt={pokemon.label} className="w-[80px] h-[80px] mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PokemonDetails;


