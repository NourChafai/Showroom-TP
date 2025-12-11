import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Auto } from '../../interfaces/auto';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css'],
  imports: [FormsModule, NgIf, NgFor, CurrencyPipe],
})
export class SearchBar implements OnInit {
  // reçu depuis le parent : [autos]="autoList"
  @Input() autos: Auto[] = [];

  // envoyé vers le parent : (onSelectAuto)="selectAuto($event)"
  @Output() onSelectAuto = new EventEmitter<Auto>();

  // lié au champ de recherche [(ngModel)]
  brand: string = '';

  // liste filtrée affichée
  filteredCars: Auto[] = [];

  ngOnInit() {
    // par défaut on affiche tout
    this.filteredCars = this.autos;
  }

  onSearch(): void {
    const query = this.brand.trim().toLowerCase();

    if (!query) {
      this.filteredCars = this.autos;
      return;
    }

    this.filteredCars = this.autos.filter((car) =>
      car.brand.toLowerCase().includes(query)
    );
  }

  // appelé au clic sur une carte
  select(car: Auto): void {
    this.onSelectAuto.emit(car); // on remonte la voiture au parent
  }
}
