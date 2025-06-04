import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { DataService } from 'src/app/services/data/data.service';
import { Data } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateGoalPage } from '../create-goal/create-goal.page';
import { EventOptionsPopoverComponent } from "../../components/event-options-popover/event-options-popover.component";
import { checkmarkCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { query, transition, trigger, style, stagger, animate } from '@angular/animations';
import { listAnimate } from 'src/app/animations/list-animation';
import { GoalsServiceService } from 'src/app/services/goals/goals-service.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
  standalone: true,
  imports: [
    IonSpinner, IonIcon, IonButton, 
    IonItem, IonList, IonLabel, IonContent, 
    IonHeader, IonTitle, IonToolbar, CommonModule, 
    FormsModule, EventOptionsPopoverComponent],
  providers: [ModalController],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [listAnimate()]
})
export class GoalsPage implements OnInit {
  goals: IGoal[] = [];
  isLoading: boolean = true;

  constructor(
    private modalController: ModalController,
    private goalsService: GoalsServiceService,
    private cdr: ChangeDetectorRef
  ) { 
    addIcons({checkmarkCircleOutline});
  }

  ngOnInit() {
    this.goalsService.getGoals().subscribe({
      next: loadedGoals => {
        this.goals = loadedGoals;
        console.log("Goals после ngOnInit:", this.goals);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  updateGoalsList() {
    this.goalsService.getGoals().subscribe({
      next: (goalsList) => {
        this.goals = goalsList;
        this.cdr.markForCheck();
        console.log("Списое целей обновлен");
      }
    })
  }

  deleteGoal(goal: IGoal) {
    this.goalsService.removeGoal(goal.id).subscribe({
      next: () => {
        console.log('Цель удалена');
        this.updateGoalsList();
      }
    })
  }

  async createGoal() {
    const goalModal = await this.modalController.create({
      component: CreateGoalPage
    });
    goalModal.onDidDismiss().then(() =>{
      setTimeout(() => this.updateGoalsList(), 1000)
    });
    return await goalModal.present();
  }

  async editGoal(goal: IGoal) {
    const editGoalModal = await this.modalController.create({
      component: CreateGoalPage,
      componentProps: {goalToEdit: goal}
    });
    editGoalModal.onDidDismiss().then(() =>{
      setTimeout(() => this.updateGoalsList(), 1000)
    })
    return await editGoalModal.present();
  }

}
