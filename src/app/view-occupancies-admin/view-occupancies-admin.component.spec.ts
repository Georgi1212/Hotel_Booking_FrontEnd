import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOccupanciesAdminComponent } from './view-occupancies-admin.component';

describe('ViewOccupanciesAdminComponent', () => {
  let component: ViewOccupanciesAdminComponent;
  let fixture: ComponentFixture<ViewOccupanciesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOccupanciesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOccupanciesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
