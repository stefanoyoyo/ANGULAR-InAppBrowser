import { TestBed } from '@angular/core/testing';

import { DataFromJsonAssetsService } from './data-from-json-assets.service';

describe('DataFromJsonAssetsService', () => {
  let service: DataFromJsonAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFromJsonAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
