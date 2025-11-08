import { TestBed } from '@angular/core/testing';

import { Toaster } from './toaster';

describe('Toaster', () => {
  let service: Toaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Toaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
