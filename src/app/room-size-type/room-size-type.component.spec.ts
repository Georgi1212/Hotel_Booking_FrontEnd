import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSizeTypeComponent } from './room-size-type.component';

describe('RoomSizeTypeComponent', () => {
  let component: RoomSizeTypeComponent;
  let fixture: ComponentFixture<RoomSizeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomSizeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomSizeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
