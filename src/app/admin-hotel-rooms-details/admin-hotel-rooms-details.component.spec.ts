import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelRoomsDetailsComponent } from './admin-hotel-rooms-details.component';

describe('AdminHotelRoomsDetailsComponent', () => {
  let component: AdminHotelRoomsDetailsComponent;
  let fixture: ComponentFixture<AdminHotelRoomsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHotelRoomsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHotelRoomsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
