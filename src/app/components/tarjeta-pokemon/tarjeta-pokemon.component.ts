import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Result } from '../../interfaces/poke-api';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { PokeServiceService } from '../../services/poke-service.service';
import { Pokemon } from '../../interfaces/pokemon';

@Component({
  selector: 'app-tarjeta-pokemon',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './tarjeta-pokemon.component.html',
  styleUrl: './tarjeta-pokemon.component.scss',
  providers: [TitleCasePipe],
})
export class TarjetaPokemonComponent implements OnChanges {

  @Input()
  pokemon!: Result;
  @Input()
  isActive: boolean = false;
  @Input()
  fullData: Pokemon | undefined;
  @Output()
  tarjetaClickeada = new EventEmitter<string>();

  id: string = '0';

  constructor(
    private titleCasePipe: TitleCasePipe,
    private pokemonService: PokeServiceService
  ) {}

  ngOnChanges(): void {
    this.extraerData();
  }

  extraerData() {
    if (this.pokemon && this.pokemon.url) {
      this.id = this.pokemon.url.substring(34, this.pokemon.url.length - 1);
    }
    if (this.fullData) {
      this.id = this.fullData.species.url.substring(
        42,
        this.fullData.species.url.length - 1
      );
      this.pokemon = {
        name: this.fullData.species.name,
        url: '',
      };
    }
  }

  get titleCasePokemonName(): string {
    return this.pokemon ? this.titleCasePipe.transform(this.pokemon.name) : '';
  }

  onTarjetaClick(): void {
    this.tarjetaClickeada.emit(this.id);
  }
}
