import {TestBed} from "@angular/core/testing";
import {RoomSizeTypeService} from "./roomSizeType-service";

describe('RoomService', () => {
  let service: RoomSizeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomSizeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
