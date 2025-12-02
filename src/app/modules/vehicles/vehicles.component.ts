import { Component } from '@angular/core';
import { VehiclesService } from './services/vehicles.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  searchTerm: string = '';

  constructor(private vehiclesService: VehiclesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const health = params['health'];
      this.vehiclesService.getVehicles().subscribe(data => {
        this.vehicles = data;

        if (health) {
          this.filteredVehicles = data.filter((v: { health: any; }) => v.health === health);
        } else {
          this.filteredVehicles = data;
        }
      });
    });
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredVehicles = this.vehicles.filter(v =>
      v.vehicleName.toLowerCase().includes(term)
    );
  }

  onAdd() {
    const newVehicle = {
      vehicleName: 'New Vehicle ' + (this.vehicles.length + 1),
      model: 'Model-' + Math.floor(Math.random() * 900),
      project: 'dummy project',
      health: 'OK',
      scc: Math.floor(Math.random() * 100),
      temp: Math.floor(Math.random() * 300),
      torque: Math.floor(Math.random() * 600),
      speed: Math.floor(Math.random() * 200),
      updated: 'just now',
      selected: false
    };

    this.vehicles.push(newVehicle);
    this.onSearch();
  }

  onDuplicate() {
    const selected = this.vehicles.find(v => v.selected);
    if (!selected) return;

    const clone = { ...selected, vehicleName: selected.vehicleName + ' Copy' };
    this.vehicles.push(clone);
    this.onSearch();
  }

  onDelete() {
    this.vehicles = this.vehicles.filter(v => !v.selected);
    this.onSearch();
  }
}
