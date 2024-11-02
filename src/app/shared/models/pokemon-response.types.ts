export interface PokemonResponseProp {
  results: { name: string, url: string }[]
}

export interface PokemonDetailsResponseProps {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  base_experience: number;

  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];

  species: {
    url: string
  }
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonSpeciesResponseProps {
  evolution_chain: { url: string };
  flavor_text_entries: FlavorTextEntry[];
}

interface EvolutionChainLink {
  species: { name: string };
  evolves_to: EvolutionChainLink[];
}

export interface EvolutionChainResponse {
  chain: EvolutionChainLink;
}


export interface PokemonResponseDataProps {
  pokemonDetails: PokemonDetailsResponseProps,
  evolutionChain: EvolutionChainResponse,
  description: string
}
