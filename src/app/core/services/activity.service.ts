import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface ActivityLog {
  user: string;
  action: string;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private readonly STORAGE_KEY = 'activity_logs';

  private activitiesSubject = new BehaviorSubject<ActivityLog[]>([]);
  activities$ = this.activitiesSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const initial: ActivityLog[] = saved ? JSON.parse(saved) : [];
    this.activitiesSubject.next(initial);
  }

  log(user: string, action: string) {
    const newLog: ActivityLog = {
      user,
      action,
      time: new Date().toLocaleString()
    };

    const updated = [newLog, ...this.activitiesSubject.value];
    this.activitiesSubject.next(updated);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  clear() {
    this.activitiesSubject.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
