import { Injectable } from '@angular/core';
import { Route } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomPreloadService {
  preloadComponents(routes: Route[]) {
    for (const route of routes) {
      // Sadece preload:true olan rotalar preload edilsin
      if (route.data?.['preload'] && route.loadComponent) {
        const result = route.loadComponent();

        // Farklı türde dönerse bile Promise'e çeviriyoruz
        Promise.resolve(result).then(() => {
          console.log(`✅ Preloaded component: ${route.path}`);
        }).catch(err => {
          console.warn(`⚠️ Failed to preload component: ${route.path}`, err);
        });
      }

      // Alt rotalar varsa recursive çağır
      if (route.children) {
        this.preloadComponents(route.children);
      }
    }
  }
}
