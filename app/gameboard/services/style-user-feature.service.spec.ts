import { TestBed } from '@angular/core/testing';

import { StyleUserFeatureService } from './style-user-feature.service';

describe('StyleUserFeatureService', () => {
  let service: StyleUserFeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleUserFeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
