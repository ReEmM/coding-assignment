import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../api.service';
import {Ticket} from '@acme/shared-models';
import {BehaviorSubject, Subscription, switchMap} from 'rxjs';
import {RefreshableUiDirective} from '../refreshable-ui.directive';

@Component({
  selector: 'acme-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent extends RefreshableUiDirective implements OnInit, OnDestroy {
  public ticket: Ticket | undefined;
  public editMode = false;

  private ticketSubscription: Subscription | undefined;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');

    // Shouldn't happen since we're on a route that needs ':id' to get called, but that's no reason to use non-null assertion
    if (!ticketId) {
      throw new Error('No ticket ID provided');
    }

    // Loads ticket uppon refresh, initial loading made by BehaviorSubject
    this.ticketSubscription = this.refresh$.pipe(
      switchMap(() => this.api.ticket(parseInt(ticketId)))
    ).subscribe((t) => this.ticket = t);
  }

  ngOnDestroy(): void {
    this.ticketSubscription?.unsubscribe();
  }
}
