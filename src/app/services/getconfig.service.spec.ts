import { TestBed } from '@angular/core/testing';

import { GetconfigService } from './getconfig.service';

describe('GetconfigService', () => {
  let service: GetconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
