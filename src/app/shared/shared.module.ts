import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { HoverHighlightDirective } from './directives/hover-highlight.directive';

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    TitleCasePipe,
    HoverHighlightDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    TitleCasePipe,
    HoverHighlightDirective
  ]
})
export class SharedModule {}
