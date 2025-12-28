import { TestBed } from '@angular/core/testing';

import { SeoManager } from './seo-manager';

describe('SeoManager', () => {
  let service: SeoManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
