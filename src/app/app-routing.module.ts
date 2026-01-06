import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RoleGuard } from './core/guards/role.guard';
import { CustomPreloadService } from './core/services/custom-preload.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // --- LOGIN ---
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule)
  },

  // --- PROTECTED LAYOUT ---
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard.component')
            .then(c => c.DashboardComponent),
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'operator', 'user', 'guest'] }
      },

      // ✅ VEHICLES - loadComponent + preload mantığı
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./modules/vehicles/vehicles.component')
            .then(c => c.VehiclesComponent),
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'operator', 'user'], preload: true }
      },

      {
        path: 'latest-activity',
        loadComponent: () =>
          import('./modules/latestActivity/latest-activity.component')
            .then(c => c.LatestActivityComponent),
        canActivate: [RoleGuard],
        data: { roles: ['admin'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // 💡 preload logic burada başlatılıyor
  constructor(private preloadService: CustomPreloadService) {
    this.preloadService.preloadComponents(routes);
  }
}
