import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabViewBookingsOccupanciesComponent } from './tab-view-bookings-occupancies.component';

describe('TabViewBookingsOccupanciesComponent', () => {
  let component: TabViewBookingsOccupanciesComponent;
  let fixture: ComponentFixture<TabViewBookingsOccupanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabViewBookingsOccupanciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabViewBookingsOccupanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
