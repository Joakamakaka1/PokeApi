import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PokeTeamComponent } from "./poke-team/poke-team.component";
import { PokedexComponent } from "./pokedex/pokedex.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'poke-team',
        component: PokeTeamComponent
    },
    {
        path: 'pokedex',
        component: PokedexComponent
    }
]