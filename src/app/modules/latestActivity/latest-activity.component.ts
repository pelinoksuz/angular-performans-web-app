import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivityService, ActivityLog } from '../../core/services/activity.service';

@Component({
  selector: 'app-latest-activity',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './latest-activity.component.html',
  styleUrl: './latest-activity.component.scss'
})
export class LatestActivityComponent implements OnInit {

  activities: ActivityLog[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityService.activities$.subscribe((logs: ActivityLog[]) => {
      this.activities = logs;
    });
  }

  clearLogs(): void {
    this.activityService.clear();
  }
}
