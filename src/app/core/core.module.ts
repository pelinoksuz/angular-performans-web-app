import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [HeaderComponent, SidebarComponent]
})
export class CoreModule {}
