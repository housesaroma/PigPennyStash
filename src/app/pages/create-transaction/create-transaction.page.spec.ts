import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTransactionPage } from './create-transaction.page';

describe('CreateTransactionPage', () => {
  let component: CreateTransactionPage;
  let fixture: ComponentFixture<CreateTransactionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
