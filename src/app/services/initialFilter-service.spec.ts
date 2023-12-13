import {TestBed} from "@angular/core/testing";
import {InitialFilterService} from "./initialFilter-service";


describe('InitialFilterService', () => {
  let service: InitialFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
