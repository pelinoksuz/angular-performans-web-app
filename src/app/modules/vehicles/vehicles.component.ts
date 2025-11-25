import { Component } from '@angular/core';
import { VehiclesService } from './services/vehicles.services';

@Component({
  selector: 'app-vehicles',
  standalone: false,
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
 vehicles: any[] = [];

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    this.vehiclesService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }
}
