import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule)
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/dashboard.component')
            .then(c => c.DashboardComponent)   // ✔ DOĞRUSU BU
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./modules/vehicles/vehicles.component')
            .then(c => c.VehiclesComponent)   // ✔ Bu zaten doğruydu
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
