import { Injectable } from '@angular/core';
import { Result } from '../interfaces/poke-api';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeServiceService {
  
  async getByPage(page: number, size: number = 40):Promise<Result[]>{
    const offset = (page-1)*size;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`)
    const resJson = await res.json();
    return resJson.results;
  }

  async getById(id : string | number):Promise<Pokemon>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return await res.json();
  }

  async getDescripcion(id: string | number):Promise<string>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto:any) =>  texto.language.name === "es")
    return texto ? texto.flavor_text : "No se econtró descripción en español";
  }
}
