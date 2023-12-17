import { TestBed } from '@angular/core/testing';

import { BloqueioServiceService } from './bloqueio-service.service';

describe('BloqueioServiceService', () => {
  let service: BloqueioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloqueioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
