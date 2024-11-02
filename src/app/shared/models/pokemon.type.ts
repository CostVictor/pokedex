export interface PokemonDataProps {
  name: string;
  height: number;
  weight: number;
  imageURL: string;

  types: string[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];

  species: {
    flavor_text_entries: { flavor_text: string; language: { name: string } }[];
    evolution_chain: { url: string };
  }
}
