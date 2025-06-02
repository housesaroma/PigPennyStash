import { TestBed } from '@angular/core/testing';

import { GoalsServiceService } from './goals-service.service';

describe('GoalsServiceService', () => {
  let service: GoalsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
