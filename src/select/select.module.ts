import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SelectPipe } from './select.pipe';
import { SelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SelectPipe,
    SelectComponent,
  ],
  exports: [ SelectComponent ],
  providers: [
  ],
})
export class SelectModule { }
