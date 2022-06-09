import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketDetailsComponent} from './ticket-details.component';
import {HttpClientModule} from '@angular/common/http';
import {UiModule} from '@acme/ui';
import {ApiService} from '@acme/shared-services';
import {TicketsComponent} from '../tickets/tickets.component';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {of, timeout} from 'rxjs';
import {DebugElement} from '@angular/core';

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  let apiService: ApiService;
  let activatedRoute: ActivatedRoute;

  const fakeRouteParams = new Map();
  fakeRouteParams.set('id', 13);

  // A fake ticket we will use
  const fakeTicket = {
    id: 13,
    description: 'test1',
    assigneeId: 1,
    completed: false,
  };

  // Fake ApiService
  class ApiServiceStub {
    ticket(id: number) {
      return of(fakeTicket);
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, UiModule, RouterModule.forRoot([])],
      providers: [
        {provide: ApiService, useValue: new ApiServiceStub()},
        {
          provide: ActivatedRoute,
          useValue: {
            // We will test route parameter with id=13
            snapshot: {paramMap: fakeRouteParams}
          }
        },
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      declarations: [TicketsComponent],
    });

    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get url param', async() => {
    expect(activatedRoute.snapshot.paramMap.get('id')).toEqual(13);
  });
});
