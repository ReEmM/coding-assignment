import { Component, OnInit } from '@angular/core';
import {switchMap} from 'rxjs';
import {RefreshableUiDirective} from '../refreshable-ui.directive';
import {ApiService} from '@acme/shared-services';

@Component({
  selector: 'acme-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent extends RefreshableUiDirective implements OnInit {
  public tickets$ = this.api.tickets();
  public users$ = this.api.users();

  constructor(private api: ApiService) {
    super()
  }

  ngOnInit(): void {
    // Loads tickets uppon refresh, initial loading made by BehaviorSubject
    this.tickets$ = this.refresh$.pipe(switchMap(() => this.api.tickets()));
  }
}
