import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json';

  // CACHE
  private vehiclesCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<any[]> {
    // 1️⃣ Cache varsa direkt onu döndür
    if (this.vehiclesCache !== null) {
      return of(this.vehiclesCache);
    }

    // 2️⃣ Cache yoksa API'yi çağır
    return this.http.get<any>(this.apiUrl).pipe(
      map(res =>
        res.Results.slice(0, 100000).map((item: any) => ({
          vehicleName: item.Make_Name,
          model: 'Model-' + Math.floor(Math.random() * 900),
          project: 'dummy project name',
          health: this.randomHealth(),
          scc: Math.floor(Math.random() * 100),
          temp: Math.floor(Math.random() * 300),
          torque: Math.floor(Math.random() * 700),
          speed: Math.floor(Math.random() * 10),
          updated: this.randomUpdated()
        }))
      ),
      tap(finalData => {
        // 3️⃣ Cache'e kaydet
        this.vehiclesCache = finalData;
      })
    );
  }

  // Cache'i manuel temizleme
  clearCache() {
    this.vehiclesCache = null;
  }

  private randomHealth() {
    const list = ['OK', 'WARN', 'ERROR'];
    return list[Math.floor(Math.random() * list.length)];
  }

  private randomUpdated() {
    const mins = Math.floor(Math.random() * 10000);
    return `${Math.floor(mins / 60)} min ago`;
  }

  getDashboardSummary() {
    return this.getVehicles().pipe(
      map(vehicles => ({
        total: vehicles.length,
        ok: vehicles.filter(v => v.health === 'OK').length,
        warn: vehicles.filter(v => v.health === 'WARN').length,
        error: vehicles.filter(v => v.health === 'ERROR').length,
        latest: vehicles.slice(0, 5)
      }))
    );
  }
}
