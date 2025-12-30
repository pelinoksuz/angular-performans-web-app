import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivityService } from '../../core/services/activity.service';

@Component({
  selector: 'app-latest-activity',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './latest-activity.component.html',
  styleUrl: './latest-activity.component.scss'
})
export class LatestActivityComponent {
  // 🔹 Activity listesi property olarak tanımlanıyor
  activities: any[] = [];

  // 🔹 Servis inject ediliyor
  constructor(private activityService: ActivityService) {}

  // 🔹 Component açıldığında verileri çekiyoruz
  ngOnInit(): void {
    this.activities = this.activityService.getAll();
  }

  // 🔹 Logları temizleme
  clearLogs(): void {
    this.activityService.clear();
    this.activities = [];
  }
}
