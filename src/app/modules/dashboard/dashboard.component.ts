import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { VehiclesService } from '../vehicles/services/vehicles.services';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit{
  summary: any;

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit() {
    this.vehiclesService.getDashboardSummary().subscribe(data => {
      this.summary = data;
      this.createStatusChart();
      this.createOverviewChart();
    });
  }

  ngAfterViewInit() {
    // Grafiklerin HTML canvas'ı oluştuğunda çizilebilmesi için
  }

  createOverviewChart() {
    const ctx = document.getElementById('overviewChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Vehicle Activity',
          data: [12, 19, 3, 5, 2, 3, 9],
          borderColor: '#0F766E',
          backgroundColor: 'rgba(15,118,110,0.3)',
          tension: 0.4
        }]
      }
    });
  }

  createStatusChart() {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Healthy (OK)', 'Warning', 'Error'],
        datasets: [{
          data: [
            this.summary.ok,
            this.summary.warn,
            this.summary.error
          ],
          backgroundColor: ['#16a34a', '#facc15', '#dc2626']
        }]
      }
    });
  }
}
