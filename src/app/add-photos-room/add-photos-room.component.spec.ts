import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotosRoomComponent } from './add-photos-room.component';

describe('AddPhotosRoomComponent', () => {
  let component: AddPhotosRoomComponent;
  let fixture: ComponentFixture<AddPhotosRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPhotosRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhotosRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
