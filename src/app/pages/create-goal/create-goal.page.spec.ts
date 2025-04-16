import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGoalPage } from './create-goal.page';

describe('CreateGoalPage', () => {
  let component: CreateGoalPage;
  let fixture: ComponentFixture<CreateGoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
