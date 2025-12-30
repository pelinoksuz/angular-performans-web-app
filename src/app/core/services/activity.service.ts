import { Injectable } from '@angular/core';

export interface ActivityLog {
  user: string;
  action: string;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private activities: ActivityLog[] = [];
  private readonly STORAGE_KEY = 'activity_logs';

  constructor() {
    // Uygulama ilk açıldığında localStorage'dan yükle
    const saved = localStorage.getItem(this.STORAGE_KEY);
    this.activities = saved ? JSON.parse(saved) : [];
  }

  getAll(): ActivityLog[] {
    // Yeni kopya döndür (mutasyondan kaçınmak için)
    return [...this.activities];
  }

  log(user: string, action: string) {
    const newLog: ActivityLog = {
      user,
      action,
      time: new Date().toLocaleString()
    };

    this.activities.unshift(newLog); // En yeni en üstte
    this.persist();
  }

  clear() {
    this.activities = [];
    this.persist();
  }

  private persist() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.activities));
  }
}
