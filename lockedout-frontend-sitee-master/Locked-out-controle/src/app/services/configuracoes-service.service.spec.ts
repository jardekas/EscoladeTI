import { TestBed } from '@angular/core/testing';

import { ConfiguracoesServiceService } from './configuracoes-service.service';

describe('ConfiguracoesServiceService', () => {
  let service: ConfiguracoesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracoesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
