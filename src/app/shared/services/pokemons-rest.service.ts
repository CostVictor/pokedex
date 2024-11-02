import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

import { PokemonResponseProp, PokemonDataResponseProps } from '../models/pokemon-response.types';


@Injectable({
  providedIn: 'root'
})
export class PokemonsRestService {
  private readonly _baseURL = "https://pokeapi.co/api/v2/pokemon"

  constructor(private _http: HttpClient) { }

  getPokemonsAPI() {
    return this._http.get<PokemonResponseProp>(this._baseURL, { params: { limit: 151, offset: 0 } })
      .pipe(
        map(res => res.results),

        // Converte a lista dos pokemons em um Observable que emite os valores um de cada vez.
        mergeMap(listPokemons => from(listPokemons)),

        // Para cada pokémon emitido, faz-se uma equisição para buscar seus detalhes, filtrando
        // as informações desejadas.
        mergeMap(pokemon => this._http.get<PokemonDataResponseProps>(pokemon.url).pipe(
          map(pokemonDetails => this.extractPokemonData(pokemonDetails))
        )),
        toArray()
      );
  }

  // Extraindo os dados necessários diretamente de PokemonDataResponseProps.
  extractPokemonData(details: PokemonDataResponseProps) {
    const { name, height, weight, types, stats, abilities, species } = details;

    const formatedTypes: string[] = []
    types.forEach(value => {
      formatedTypes.push(value.type.name)
    })

    const imageURL = details.sprites.front_default

    // // Obtendo a descrição em inglês da lista de entradas de texto (caso necessário)
    // const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    // const description = descriptionEntry ? descriptionEntry.flavor_text : '';

    return { name, height, weight, imageURL, types: formatedTypes, stats, abilities, species }
  }
}
