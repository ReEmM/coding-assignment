import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, take} from 'rxjs';
import {ApiService} from '@acme/shared-services';

@Component({
  selector: 'acme-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent {
  /**
   * Will inform parent when a new ticket gets added
   * @private
   */
  private onTicketAdded = new EventEmitter<void>();

  public users$ = this.api.users();

  /**
   * Initiates our ticket creation form
   */
  public ticketForm: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
    assigneeId: new FormControl('', Validators.required)
  });

  /**
   * Exposes an observable for parent to listen to
   */
  @Output() public ticketAdded$: Observable<void> = this.onTicketAdded.asObservable();

  /**
   * Informs us ticket creation is processed by backend
   */
  public ticketCreationPending$ = new BehaviorSubject<boolean>(false);

  constructor(private api: ApiService) {}

  public onSubmit(): void {
    this.ticketCreationPending$.next(true);

    // Deconstructing needed informations for ticket creation
    const { description, assigneeId } = this.ticketForm.value;

    // We'll just "take 1" for the next nested observables so they completes immediately after first
    // reception. No extra step needed to be ready for next submission
    this.api.newTicket({description}).pipe(take(1)).subscribe(newTicket => {
      this.api.assign(newTicket.id, assigneeId).pipe(take(1)).subscribe(() => {
        this.onTicketAdded.next();

        this.ticketCreationPending$.next(false);
      });
    });
  }
}
