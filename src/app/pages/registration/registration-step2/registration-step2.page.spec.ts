import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationStep2Page } from './registration-step2.page';

describe('RegistrationStep2Page', () => {
  let component: RegistrationStep2Page;
  let fixture: ComponentFixture<RegistrationStep2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
