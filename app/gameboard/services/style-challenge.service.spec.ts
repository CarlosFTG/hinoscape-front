import { TestBed } from '@angular/core/testing';

import { StyleChallengeService } from './style-challenge.service';

describe('StyleChallengeService', () => {
  let service: StyleChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
