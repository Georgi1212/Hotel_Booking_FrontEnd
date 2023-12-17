import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoHotelComponent } from './add-photo-hotel.component';

describe('AddPhotoHotelComponent', () => {
  let component: AddPhotoHotelComponent;
  let fixture: ComponentFixture<AddPhotoHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPhotoHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhotoHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
