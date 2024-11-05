import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { PokemonsService } from 'src/app/shared/services/pokemons.service';
import { PokemonDataProps } from 'src/app/shared/models/pokemon.type';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  pokemon: PokemonDataProps | null = null
  stats = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD"
  }

  constructor(
    private _pokemons: PokemonsService,
    private _activeRouter: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    const namePokemon = this._activeRouter.snapshot.paramMap.get("name") ?? ""
    this.pokemon = this._pokemons.getPokemonByName(namePokemon.toLowerCase())

    if (!this.pokemon) {
      this._router.navigate(["/"])
    }
  }

  getStatAbbreviation(statKey: string) {
    return this.stats[statKey as keyof typeof this.stats] || '';
  }
}
