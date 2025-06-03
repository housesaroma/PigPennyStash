import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonButtons } from '@ionic/angular/standalone';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { ModalController } from '@ionic/angular';
import { GoalsServiceService } from 'src/app/services/goals/goals-service.service';

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

  title = signal('');
  targetSum = signal('');
  currentSum = signal('');

  constructor(
    private modalController: ModalController,
    private goalService: GoalsServiceService
  ) { }

  ngOnInit() {
    if (this.goalToEdit) {
      this.title.set(this.goalToEdit.name);
      this.targetSum.set(this.goalToEdit.targetAmount.toString());
      this.currentSum.set(this.goalToEdit.currentAmount.toString());
      }
    }

  saveGoal() {
    const goalsData: IGoal = {
      name: this.title(),
      targetAmount: +this.targetSum(),
      currentAmount: +this.currentSum()
    }

    if(this.goalToEdit) {
      this.goalService.updateGoal(goalsData, this.goalToEdit.id).subscribe({
        next: () => console.log("Цель обновлена")
      })
    }
    else {
      this.goalService.createGoal(goalsData).subscribe({
        next: () => console.log("Цель добавлена")
      })
    }
    this.modalController.dismiss();
      // const storedGoals = localStorage.getItem('goals');
      // let goals: IGoal[] = storedGoals ? JSON.parse(storedGoals) : [];

      // if (!this.goalToEdit) {
      //   const isDuplicate = goals.some(e => e.title === this.title());
      //   if (isDuplicate) return;
      // }
  
      // const goalData: IGoal = {
      //   id: this.goalToEdit ? this.goalToEdit.id?.toString() : this.generateId(goals),
      //   title: this.title(),
      //   targetSum: +this.targetSum(),
      //   currentSum: +this.currentSum()
      // }
      // if(this.goalToEdit){
      //   goals = goals.map(e => e.id === this.goalToEdit?.id ? goalData : e);
      // } else {
      //   goals.push(goalData);
      // }
      // localStorage.setItem('goals', JSON.stringify(goals));
  }

  // private generateId(events: IGoal[]): number {
  //     return events.length > 0
  //       ? Math.max(...events.map(e => e.id)) + 1
  //       : 1;
  //   }
}
