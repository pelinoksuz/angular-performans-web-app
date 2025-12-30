import { Component } from '@angular/core';
import { VehiclesService } from './services/vehicles.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../core/services/activity.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  vehicles: any[] = [];
  filteredVehicles: any[] = [];
  searchTerm = '';
  userRole: string | null = null;
  isLoading = false;

  currentPage = 1;
  pageSize = 15;

  constructor(
    private vehiclesService: VehiclesService,
    private activatedRoute: ActivatedRoute,
    private activityService: ActivityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userRole = localStorage.getItem('role');

    this.activatedRoute.queryParams.subscribe(params => {
      const health = params['health'];
      this.isLoading = true;

      this.vehiclesService.getVehicles().subscribe({
        next: data => {
          this.vehicles = data;
          this.filteredVehicles = health
            ? data.filter((v: any) => v.health === health)
            : data;

          this.currentPage = 1;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    });
  }

  // =========================
  // SEARCH
  // =========================
  onSearch() {
    const term = this.searchTerm.toLowerCase();

    this.filteredVehicles = this.vehicles.filter(v =>
      v.vehicleName.toLowerCase().includes(term)
    );

    this.currentPage = 1;
  }

  // =========================
  // PAGINATION
  // =========================
  get totalPages(): number {
    return Math.ceil(this.filteredVehicles.length / this.pageSize);
  }

  get paginatedVehicles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredVehicles.slice(start, start + this.pageSize);
  }

  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const windowSize = 5; // ORTADA GÖRÜNEN SABİT SAYFA SAYISI

    if (total <= windowSize + 2) {
      // küçük dataset
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(windowSize / 2);
    let end = current + Math.floor(windowSize / 2);

    // sola taşma
    if (start < 2) {
      start = 2;
      end = start + windowSize - 1;
    }

    // sağa taşma
    if (end > total - 1) {
      end = total - 1;
      start = end - windowSize + 1;
    }

    const pages: (number | string)[] = [];

    pages.push(1);

    if (start > 2) {
      pages.push('…');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push('…');
    }

    pages.push(total);

    return pages;
  }

  goToPageSafe(page: number | string) {
    if (typeof page === 'number') {
      this.goToPage(page);
    }
  }


  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // =========================
  // ROLE
  // =========================
  get isOperator(): boolean {
    return this.userRole?.toLowerCase() === 'operator';
  }

  // =========================
  // CRUD
  // =========================
  onAdd() {
    if (!this.isOperator) return;

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

    const role = this.authService.currentRole;
    if (role) {
      this.activityService.log(
        role,
        `Added vehicle "${newVehicle.vehicleName}"`
      );
    }
  }

  onDuplicate() {
    if (!this.isOperator) return;

    const selected = this.vehicles.find(v => v.selected);
    if (!selected) return;

    this.vehicles.push({ ...selected, vehicleName: selected.vehicleName + ' Copy' });
    this.onSearch();

    const role = this.authService.currentRole;
    if (role) {
      this.activityService.log(
        role,
        `Duplicated vehicle "${selected.vehicleName}"`
      );
    }
  }

  onDelete() {
    if (!this.isOperator) return;
    const count = this.vehicles.filter(v => v.selected).length;
    this.vehicles = this.vehicles.filter(v => !v.selected);
    this.onSearch();

    const role = this.authService.currentRole;
    if (role) {
      this.activityService.log(
        role,
        `Deleted ${count} vehicle(s)`
      );
    }
  }

  editCell(vehicle: any, field: string) {
    if (!this.isOperator) return;
    vehicle.editingField = field;
    const role = this.authService.currentRole;
    if (role) {
      this.activityService.log(
        role,
        `Editing ${field} of ${vehicle.vehicleName}`
      );
    }

  }

  saveCell(vehicle: any) {
    if (!this.isOperator) return;
    delete vehicle.editingField;
  }
}
