import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { PokemonsRestService } from './pokemons-rest.service';
import { PokemonDataProps } from '../models/pokemon.type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private _dataAllPokemons = new BehaviorSubject<PokemonDataProps[]>([])

  constructor(private _pokemonsRest: PokemonsRestService) { this.loadAll() }

  get pokemons$() {
    return this._dataAllPokemons.asObservable()
  }

  filterPokemon(name: string) {
    return this._dataAllPokemons
      .pipe(map(pokemons => pokemons.filter(pokemon => pokemon.name.includes(name))))
  }

  private loadAll() {
    this._pokemonsRest.getPokemonsAPI().pipe(
      tap(dataAllPokemons => this._dataAllPokemons.next(dataAllPokemons))
    ).subscribe()
  }
}
