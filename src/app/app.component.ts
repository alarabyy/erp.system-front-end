import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
