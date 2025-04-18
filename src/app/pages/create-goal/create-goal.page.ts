import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonButtons } from '@ionic/angular/standalone';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.page.html',
  styleUrls: ['./create-goal.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonInput, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ModalController]
})
export class CreateGoalPage implements OnInit {
  @Input() goalToEdit?: IGoal;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    if (this.goalToEdit) {
      this.addGoalForm.patchValue({
        title: this.goalToEdit.title,
        targetSum: this.goalToEdit.targetSum,
        currentSum: this.goalToEdit.currentSum
      })
    }
  }
  protected addGoalForm = new FormGroup({
    title: new FormControl(),
    targetSum: new FormControl(),
    currentSum: new FormControl()
  })

  addGoal() {
      const storedGoals = localStorage.getItem('goals');
      let goals: IGoal[] = storedGoals ? JSON.parse(storedGoals) : [];

      if (!this.goalToEdit) {
        const isDuplicate = goals.some(e => e.title === this.addGoalForm.get('title')?.value);
        if (isDuplicate) return;
      }
  
      const goalData: IGoal = {
        id: this.goalToEdit ? this.goalToEdit.id : this.generateId(goals),
        title: this.addGoalForm.controls['title']?.value,
        targetSum: this.addGoalForm.controls['targetSum']?.value,
        currentSum: this.addGoalForm.controls['currentSum']?.value
      }
      if(this.goalToEdit){
        goals = goals.map(e => e.id === this.goalToEdit?.id ? goalData : e);
      } else {
        goals.push(goalData);
      }
      localStorage.setItem('goals', JSON.stringify(goals));
      this.modalController.dismiss();
  }

  private generateId(events: IGoal[]): number {
      return events.length > 0
        ? Math.max(...events.map(e => e.id)) + 1
        : 1;
    }
}
