import axios, { AxiosResponse } from "axios";
import { GetPokemonsDto, PokemonShortInfo } from "../types/Pokemon";

export const pokeAPI = {
  getPokemons: async (count): Promise<PokemonShortInfo[]> => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit="+count.toString()
    );

    return response.data.results;
  },
};
