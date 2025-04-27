import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonList, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { DataService } from 'src/app/services/data/data.service';
import { Data } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateGoalPage } from '../create-goal/create-goal.page';
import { EventOptionsPopoverComponent } from "../../components/event-options-popover/event-options-popover.component";
import { checkmarkCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonItem, IonList, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, EventOptionsPopoverComponent],
  providers: [ModalController]
})
export class GoalsPage implements OnInit {
  goals: IGoal[] = [];
  private goalsUrl = 'assets/goals.json';

  constructor(
    private dataService: DataService,
    private modalController: ModalController
  ) { 
    addIcons({checkmarkCircleOutline});
  }

  ngOnInit() {
    this.initializeGoals();
    console.log("Goals после ngOnInit:", this.goals);
  }

  initializeGoals() {
    const storedGoals = localStorage.getItem("goals");

    if (!storedGoals) {
      this.dataService.getData<IGoal[]>(this.goalsUrl).subscribe({
        next: (_goals: IGoal[]) => {
          console.log("Загруженные цели:", _goals);
          localStorage.setItem("goals", JSON.stringify(_goals));
          this.goals = _goals;
        },
        error: (err) => {
          console.log("Ошибка загрузки целей", err);
        }
      })
    }
    else {
      this.goals = JSON.parse(storedGoals);
    }
  }

  deleteGoal(goal: IGoal) {
    this.goals = this.goals.filter(e => e.id !== goal.id);
    localStorage.setItem('goals', JSON.stringify(this.goals));
  }

  async createGoal() {
    const goalModal = await this.modalController.create({
      component: CreateGoalPage
    });
    goalModal.onDidDismiss().then(() =>{
      this.initializeGoals();
    });
    return await goalModal.present();
  }

  async editGoal(goal: IGoal) {
    const editGoalModal = await this.modalController.create({
      component: CreateGoalPage,
      componentProps: {goalToEdit: goal}
    });
    editGoalModal.onDidDismiss().then(() =>{
      this.initializeGoals();
    })
    return await editGoalModal.present();
  }

}
