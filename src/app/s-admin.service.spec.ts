import { TestBed } from '@angular/core/testing';

import { SAdminService } from './s-admin.service';

describe('SAdminService', () => {
  let service: SAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
