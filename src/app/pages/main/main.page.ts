import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonProgressBar } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { IEvent } from 'src/app/interfaces/event.interface';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { EventsService } from 'src/app/services/events/events.service';
import { GoalsServiceService } from 'src/app/services/goals/goals-service.service';
import { TransactionServiceService } from 'src/app/services/transaction/transaction-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonProgressBar, CommonModule, FormsModule]
})
export class MainPage implements OnInit {
  events: IEvent[] = [];
  goals: IGoal[] = [];
  transactions: Transaction[] = [];
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;

  constructor(
    private eventService: EventsService,
    private goalsService: GoalsServiceService,
    private transService: TransactionServiceService
  ) { }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.initializeEvents();
    this.initializeGoals();
    this.initializeTransactions();
  }

  private initializeEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (loadedEvents) => {
        this.events = loadedEvents;
        console.log("Загруженные события: ", this.events);
      }
    })
  }

  private initializeGoals() {
    this.goalsService.getGoals().subscribe({
      next: (loadedGoals) => {
        this.goals = loadedGoals;
        console.log("Загруженные цели: ", this.goals);
      }
    })
  }

  private initializeTransactions() {
    this.transService.getTransactions().subscribe({
      next: (loadedTransactions) => {
        this.transactions = loadedTransactions;
        console.log("Загруженные транзакции: ", this.transactions);
        this.calculateFinancialSummary();
      }
    })
  }

  private calculateFinancialSummary() {
    this.totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.sum, 0);

    this.totalExpenses = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.sum, 0);

    this.balance = this.totalIncome - this.totalExpenses;
  }

  getGoalProgress(goal: IGoal): number {
    return (goal.currentAmount / goal.targetAmount) * 100;
  }
}
