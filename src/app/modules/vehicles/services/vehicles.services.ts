import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';

  constructor(private http: HttpClient) {}

  getVehicles() {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.Results.slice(0, 10).map((item: { Make_Name: any; }) => ({
        vehicleName: item.Make_Name,
        model: 'Model-' + Math.floor(Math.random() * 900),
        project: 'dummy project name',
        health: this.randomHealth(),
        scc: Math.floor(Math.random() * 100),
        temp: Math.floor(Math.random() * 300),
        torque: Math.floor(Math.random() * 700),
        speed: Math.floor(Math.random() * 10),
        updated: this.randomUpdated()
      })))
    );
  }

  private randomHealth() {
    const list = ['OK', 'WARN', 'ERROR'];
    return list[Math.floor(Math.random() * list.length)];
  }

  private randomUpdated() {
    const mins = Math.floor(Math.random() * 10000);
    return `${Math.floor(mins / 60)} min ago`;
  }
}
