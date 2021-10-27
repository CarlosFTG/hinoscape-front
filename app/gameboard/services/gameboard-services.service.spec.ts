import { TestBed } from '@angular/core/testing';

import { GameboardServicesService } from './gameboard-services.service';

describe('GameboardServicesService', () => {
  let service: GameboardServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameboardServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
