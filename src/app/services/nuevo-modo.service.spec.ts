import { TestBed } from '@angular/core/testing';

import { NuevoModoService } from './nuevo-modo.service';

describe('NuevoModoService', () => {
  let service: NuevoModoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoModoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
