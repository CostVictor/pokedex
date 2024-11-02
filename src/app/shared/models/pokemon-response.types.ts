export interface PokemonResponseProp {
  results: { name: string, url: string }[]
}

export interface PokemonDataResponseProps {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };

  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];

  species: {
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
    evolution_chain: { url: string };
  }
}
