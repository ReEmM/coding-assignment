import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CreateTicketComponent, SpinnerComponent],
  exports: [CreateTicketComponent, SpinnerComponent],
})
export class UiModule {}
