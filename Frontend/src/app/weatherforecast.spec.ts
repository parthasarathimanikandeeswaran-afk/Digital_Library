import { TestBed } from '@angular/core/testing';

import { Weatherforecast } from './weatherforecast';

describe('Weatherforecast', () => {
  let service: Weatherforecast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Weatherforecast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
