import { TestBed } from '@angular/core/testing';

import { TouristRoutesService } from './tourist-routes.service';

describe('TouristRoutesService', () => {
  let service: TouristRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
