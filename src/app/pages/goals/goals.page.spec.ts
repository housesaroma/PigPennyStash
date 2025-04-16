import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalsPage } from './goals.page';

describe('GoalsPage', () => {
  let component: GoalsPage;
  let fixture: ComponentFixture<GoalsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
