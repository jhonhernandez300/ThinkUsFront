import { TestBed } from '@angular/core/testing';

import { EmployeeDataTransferService } from './employee-data-transfer.service';

describe('EmployeeDataTransferService', () => {
  let service: EmployeeDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
