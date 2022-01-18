import { TestBed } from '@angular/core/testing';

import { UpperMenuService } from './upper-menu.service';

describe('UpperMenuService', () => {
  let service: UpperMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpperMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
