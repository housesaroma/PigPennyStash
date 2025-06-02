import { TestBed } from '@angular/core/testing';

import { TransactionServiceService } from './transaction/transaction-service.service';

describe('TransactionServiceService', () => {
  let service: TransactionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
