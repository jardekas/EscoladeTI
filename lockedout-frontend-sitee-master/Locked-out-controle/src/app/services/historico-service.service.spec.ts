import { TestBed } from '@angular/core/testing';

import { HistoricoServiceService } from './historico-service.service';

describe('HistoricoServiceService', () => {
  let service: HistoricoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
