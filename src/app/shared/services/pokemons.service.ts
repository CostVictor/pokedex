import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PokemonsRestService } from './pokemons-rest.service';
import { PokemonDataProps } from '../models/pokemon.type';
import { positionFormatter } from 'src/app/utils/formatters';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private _dataAllPokemons = new BehaviorSubject<PokemonDataProps[]>([])

  constructor(private _pokemonsRest: PokemonsRestService) { this.loadAll() }

  get pokemons$() {
    return this._dataAllPokemons.asObservable()
  }

  getPokemonByName(name: string) {
    const pokemons = this._dataAllPokemons.getValue()
    const pokemon = pokemons
      .filter(pokemon => pokemon.name.includes(name))[0]

    if (pokemon) {
      const pos = pokemons.findIndex((pokemon => pokemon.name === name))
      pokemon.pos = positionFormatter(pos + 1)

      const listOfEvolutionImages: string[] = []
      pokemon.evolution.forEach(nameVersion => {
        const version = pokemons.filter(pokemon => pokemon.name === nameVersion)[0]
        listOfEvolutionImages.push(version.imageURL)
      })

      pokemon.evolution = listOfEvolutionImages
    }

    return pokemon
  }

  private loadAll() {
    this._pokemonsRest.getPokemonsAPI().pipe(
      tap(dataAllPokemons => this._dataAllPokemons.next(dataAllPokemons))
    ).subscribe()
  }
}
