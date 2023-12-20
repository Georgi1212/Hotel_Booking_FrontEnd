import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingsUserComponent } from './view-bookings-user.component';

describe('ViewBookingsUserComponent', () => {
  let component: ViewBookingsUserComponent;
  let fixture: ComponentFixture<ViewBookingsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBookingsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookingsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
