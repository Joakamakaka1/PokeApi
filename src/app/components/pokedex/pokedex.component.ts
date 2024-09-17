import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FotoPokemonComponent } from '../foto-pokemon/foto-pokemon.component';
import { TarjetaPokemonComponent } from '../tarjeta-pokemon/tarjeta-pokemon.component';
import { PokeServiceService } from '../../services/poke-service.service';
import { Result } from '../../interfaces/poke-api';
import { Pokemon } from '../../interfaces/pokemon';
import { DetallePokemonComponent } from "../detalle-pokemon/detalle-pokemon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FotoPokemonComponent,
    TarjetaPokemonComponent,
    DetallePokemonComponent,
    CommonModule
],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss',
})
export class PokedexComponent implements OnInit {

  constructor(private pokemon: PokeServiceService) {}

  @ViewChild('tarjetas') tarjetasElement!: ElementRef;

  listaPokemons: Result[] = [];
  pokemonSeleccionado?: Pokemon;
  pagina: number = 1;
  cargando: boolean = false;
  detalle: boolean = false;
  activeCardId: string | null = null;

  ngOnInit(): void {
    this.cargarLista();
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

  async cargarLista() {
    if (this.cargando) return;
    this.cargando = true;
    this.listaPokemons = [...this.listaPokemons, ...await this.pokemon.getByPage(this.pagina)];
    this.pagina++;
    this.cargando = false;
  }

  onScroll(e: any) {
    if (
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      ) === e.srcElement.scrollHeight
    ) {
      this.cargarLista();
    }
  }

  cambioColor(id: string): void {
    this.activeCardId = id;
  }

  cambiarEstadoDetalle() {
    if (this.pokemonSeleccionado) this.detalle = !this.detalle;
  }

  async tarjetaClickeada(id: string) {
    if (this.pokemonSeleccionado && id === this.pokemonSeleccionado?.id.toString()) {
      return this.cambiarEstadoDetalle();
    }
    this.pokemonSeleccionado = await this.pokemon.getById(id);
    this.activeCardId = id; 
  }
}