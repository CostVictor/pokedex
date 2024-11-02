export interface PokemonDataProps {
  name: string;
  height: number;
  weight: number;
  description: string;
  imageURL: string;
  type: string[];
  abilities: string[];
  evolution: string[];
  stats: { stat: string, base_stat: number }[];
}
