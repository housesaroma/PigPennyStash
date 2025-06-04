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
  imports: [
    IonButtons, IonButton, IonInput, IonLabel, 
    IonItem, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule, ReactiveFormsModule
  ],
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
  }
}