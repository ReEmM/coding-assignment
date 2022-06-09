import {Directive, EventEmitter, Host, OnInit, Output,} from '@angular/core';
import {ApiService} from '../api.service';
import {take} from 'rxjs';
@Directive({
  selector: '[acmeTicketCompletion]',
  exportAs: 'ticketCompletion'
})
export class TicketCompletionDirective {

  @Output() public completionStatusChanged = new EventEmitter<void>();

  constructor(private api: ApiService) {
  }

  public toggle(ticketId: number, completed: boolean): void {
    this.api.complete(ticketId, !completed).pipe(take(1)).subscribe(
      () => this.completionStatusChanged.next()
    );
  }

}
