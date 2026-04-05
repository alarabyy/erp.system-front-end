import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, SidebarComponent],
  exports: [NavbarComponent, FooterComponent, SidebarComponent]
})
export class LayoutModule {}
