import {Observable, of} from 'rxjs';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsComponent} from './tickets.component';
import {UiModule} from '@acme/ui';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '@acme/shared-services';
import {TicketCompletionDirective} from '../ticket-completion-directive';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let apiService: ApiService;

  // Some fake data
  const fakeTickets = [
    {
      id: 1,
      description: 'test1',
      assigneeId: 1,
      completed: false,
    },
    {
      id: 2,
      description: 'test2',
      assigneeId: 1,
      completed: false,
    },
    {
      id: 3,
      description: 'test3',
      assigneeId: 1,
      completed: true,
    }
  ];

  // Fake ApiService
  class ApiServiceStub {
    tickets() {
      return of(fakeTickets);
    }

    users() {
      return new Observable();
    }

    complete(ticketId: number, completed: boolean) {
      const fakeTicket = fakeTickets.find(t => t.id === ticketId);

      if (fakeTicket) {
        fakeTicket.completed = completed;

        return of(fakeTicket);
      }

      // We won't test this case as it should trigger an error in
      // case backend doesn't find a ticket by the given id
      return null;
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, UiModule],
      providers: [
        {provide: ApiService, useValue: new ApiServiceStub()}
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TicketsComponent, TicketCompletionDirective],
    });

    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    jest.spyOn(apiService, 'tickets').mockImplementation(() => of([]));
    jest.spyOn(apiService, 'users').mockImplementation(() => of([]));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  /**
   * Checks if the tickets$ observable can actually receive tickets
   */
  it('can fetch tickets', async () => {
    component.tickets$.subscribe((tickets) => {
      fixture.detectChanges();
      expect(tickets).toEqual(fakeTickets);
    });
  });

  /**
   * Chekcs if table contains expected number of rows
   */
  it('should render tickets', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const pageDebug: DebugElement = fixture.debugElement;
    const pageElement: HTMLElement = pageDebug.nativeElement;

    // We will count our table rows
    const numberOfTickets = pageElement.getElementsByTagName('tr').length;

    // We subtract 1 since the first row is for headers
    expect(numberOfTickets - 1).toEqual(fakeTickets.length);
  });

  /**
   * Checks if toggle method from TicketCompletionDirective gets called when clicking on a ticket's completion checkbox
   *
   * To go futher we could wait for the server request triggered by the toggle directive to come
   * back and check that the received completion status is the opposite of the initial loaded value (before click)
   */
  it('click on completion checkbox triggers directive toggle method', () => {
    // Sets the ticket index we will use
    const ticketIndex = 2;

    component.ngOnInit();
    fixture.detectChanges();

    const pageDebug: DebugElement = fixture.debugElement;
    const pageElement: HTMLElement = pageDebug.nativeElement;

    const ticketRow = pageElement.getElementsByTagName('tr')[ticketIndex];

    // Gets the TicketCompletionDirective for given index
    // We subtract 1 since the first row is for headers
    const completionDirective = pageDebug.queryAll(By.directive(TicketCompletionDirective))[ticketIndex - 1];
    const directiveInstance = completionDirective.injector.get(TicketCompletionDirective)

    const spyToggle = jest.spyOn(directiveInstance,'toggle');

    // Clicks the given ticket index completion checkbox
    ticketRow.getElementsByTagName('input')[0].click();

    expect(spyToggle).toHaveBeenCalled();
  });
});
