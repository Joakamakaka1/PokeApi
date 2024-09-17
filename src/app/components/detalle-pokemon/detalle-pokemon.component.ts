import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { TarjetaPokemonComponent } from '../tarjeta-pokemon/tarjeta-pokemon.component';
import { Pokemon } from '../../interfaces/pokemon';
import { PokeServiceService } from '../../services/poke-service.service';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-detalle-pokemon',
  standalone: true,
  imports: [TarjetaPokemonComponent, CommonModule, BaseChartDirective],
  templateUrl: './detalle-pokemon.component.html',
  styleUrl: './detalle-pokemon.component.scss',
})
export class DetallePokemonComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public radarChartType: ChartType = 'radar';

  @Input() pokemon?: Pokemon;
  @Input() abierto: boolean = false;
  @Output() clicked = new EventEmitter();
  descripcion: string = '';

  constructor(private pokemonService: PokeServiceService) {}

  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        // Configurar si es necesario
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        grid: {
        },
        ticks: {
          color: '#2f2c24', 
          display: false, 
        },
        suggestedMin: 0,
        suggestedMax: 170,
      },
    },
  };

  public radarChartLabels: string[] = [
    'Vida',
    'Ataque',
    'Defensa',
    'Ataque especial',
    'Defensa especial',
    'Velocidad',
  ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [{ data: [], label: 'Estadística' }],
  };

  ngOnChanges() {
    if (this.pokemon) {
      this.pokemonService.getDescripcion(this.pokemon.id).then((res) => {
        this.descripcion = res;
      });

      this.updateChartData();
    }
  }

  private updateChartData() {
    if (this.pokemon?.stats) {
      this.radarChartData.datasets[0].data = this.pokemon.stats.map(
        (stat) => stat.base_stat
      );
      if (this.chart) {
        this.chart.update();
      }
    }
  }

  getTipoColor(tipo: string): string {
    return this.POKEMON_TYPE_COLORS[tipo] || '#000000';
  }

  getTipoEnEspanol(tipo: string): string {
    return this.POKEMON_TYPE_TRANSLATIONS[tipo] || tipo;
  }

  private readonly POKEMON_TYPE_COLORS: { [key: string]: string } = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#8D6E63',
    flying: '#A3C6E0',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#BCAAA4',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  private readonly POKEMON_TYPE_TRANSLATIONS: { [key: string]: string } = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada',
  };
}
