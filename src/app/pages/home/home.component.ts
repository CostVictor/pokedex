import { Component } from '@angular/core';
import { PokemonsService } from 'src/app/shared/services/pokemons.service';
import { PokemonDataProps } from 'src/app/shared/models/pokemon.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private _pokemonsService: PokemonsService) { }
  allPokemons: PokemonDataProps[] = []

  async ngOnInit() {
    this._pokemonsService.pokemons.subscribe((pokemons => { this.allPokemons = pokemons; }))
  }
}
