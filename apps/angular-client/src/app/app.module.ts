import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { UiModule } from '@acme/ui';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import {TicketCompletionDirective} from './pages/ticket-completion-directive';

@NgModule({
  declarations: [AppComponent, TicketsComponent, TicketDetailsComponent, TicketCompletionDirective],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(
      [
        {path: 'tickets', component: TicketsComponent},
        {path: 'details/:id', component: TicketDetailsComponent},
        { path: '', redirectTo: '/tickets', pathMatch: 'full' }
      ],
      {
        initialNavigation: 'enabledBlocking',
      }
    ),
    UiModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
