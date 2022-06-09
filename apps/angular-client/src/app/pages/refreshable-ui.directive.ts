import {Directive, EventEmitter, Host, OnDestroy, OnInit, Output,} from '@angular/core';
import {ApiService} from '../api.service';
import {BehaviorSubject, take} from 'rxjs';
@Directive()
export abstract class RefreshableUiDirective {

  private refreshSubject = new BehaviorSubject<boolean>(true);

  public refresh$ = this.refreshSubject.asObservable();

  public refresh(): void {
    this.refreshSubject.next(true);
  }
}
