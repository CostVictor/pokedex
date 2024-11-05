import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, toArray } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  PokemonResponseProp,
  PokemonDetailsResponseProps,
  PokemonSpeciesResponseProps,
  EvolutionChainResponse,
  PokemonResponseDataProps
} from '../models/pokemon-response.types';


@Injectable({
  providedIn: 'root'
})
export class PokemonsRestService {

  // Por meio deste comentário, expresso meu profundo desprezo por esta API.
  private readonly _baseURL = "https://pokeapi.co/api/v2/pokemon"

  constructor(private _http: HttpClient) { }

  getPokemonsAPI() {
    const request = this._http.get<PokemonResponseProp>(this._baseURL, { params: { limit: 300, offset: 0 } })
      .pipe(catchError(this.handleError));

    // Realiza a extração das informações.
    return request.pipe(
      map(res => res.results),

      // Converte a lista dos pokemons em um Observable que emite os valores um de cada vez.
      mergeMap(listPokemons => from(listPokemons)),

      // Para cada Pokémon, faz uma requisição para obter seus detalhes.
      mergeMap(pokemon =>
        this._http.get<PokemonDetailsResponseProps>(pokemon.url).pipe(
          mergeMap(pokemonDetails => {
            const speciesUrl = pokemonDetails.species.url;

            // Faz uma requisição para extrair os dados da espécie do Pokémon.
            return this._http.get<PokemonSpeciesResponseProps>(speciesUrl).pipe(
              mergeMap(species => {
                const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
                const description = descriptionEntry ? descriptionEntry.flavor_text : '';

                // Formata a descrição do pokémon.
                let formatedDescriotion = description.toLowerCase().replace("\f", " ").split(". ")
                formatedDescriotion = formatedDescriotion.map(text => text.charAt(0).toUpperCase() + text.slice(1))

                // Faz a requisição para a cadeia evolutiva do Pokémon e agrupa com os detalhes e a descrição.
                return this._http.get<EvolutionChainResponse>(species.evolution_chain.url).pipe(
                  map(evolutionChain => ({
                    pokemonDetails,
                    evolutionChain,
                    description: formatedDescriotion.join(". ")
                  }))
                );
              })
            );
          })
        )
      ),
      // Mapeia o resultado para passar todos os dados para extractPokemonData
      map(PokemonResponseData => this.extractPokemonData(PokemonResponseData)),
      toArray()
    );
  }

  // Tratamento de erros
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  // Extraindo os dados necessários diretamente de PokemonDataResponseProps.
  private extractPokemonData(dataPokemon: PokemonResponseDataProps) {
    const { pokemonDetails, evolutionChain, description } = dataPokemon
    const { name } = pokemonDetails;

    const height = pokemonDetails.height / 10
    const weight = pokemonDetails.weight / 10

    // Obtem sua cadeia evolutiva.
    const evolution: string[] = [];
    let currentStage = evolutionChain.chain;

    while (currentStage) {
      evolution.push(currentStage.species.name);
      currentStage = currentStage.evolves_to[0];
    }

    // Obtem a imagem do pokemon.
    const imageURL = pokemonDetails.sprites.front_default

    // Extrai os tipos.
    const type: string[] = []
    pokemonDetails.types.forEach(value => {
      type.push(value.type.name)
    })

    // Extrai suas habilidades.
    const abilities: string[] = []
    pokemonDetails.abilities.forEach(value => {
      abilities.push(value.ability.name)
    })

    // Extrai suas estatísticas.
    const stats: { stat: string, base_stat: number }[] = []
    pokemonDetails.stats.forEach(value => {
      stats.push({ stat: value.stat.name, base_stat: value.base_stat })
    })

    return { name, height, weight, description, imageURL, type, abilities, evolution, stats }
  }
}
