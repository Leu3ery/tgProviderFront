import { TestBed } from '@angular/core/testing';

import { Transaktions } from './transaktions';

describe('Transaktions', () => {
  let service: Transaktions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Transaktions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
