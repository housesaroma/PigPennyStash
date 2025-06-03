import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonProgressBar } from '@ionic/angular/standalone';
import { DataService } from 'src/app/services/data/data.service';
import { IEvent } from 'src/app/interfaces/event.interface';
import { IGoal } from 'src/app/interfaces/goal.interface';
import { Transaction } from 'src/app/interfaces/transaction.interface';

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

  private eventsUrl = 'assets/events.json';
  private goalsUrl = 'assets/goals.json';
  private transactionsUrl = 'assets/transactions.json';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.initializeEvents();
    this.initializeGoals();
    this.initializeTransactions();
  }

  private initializeEvents() {
    const storedEvents = localStorage.getItem('events');

    if (!storedEvents) {
      this.dataService.getData<IEvent[]>(this.eventsUrl).subscribe({
        next: (events: IEvent[]) => {
          console.log('Загруженные события:', events);
          localStorage.setItem('events', JSON.stringify(events));
          this.events = events;
        },
        error: (error) => {
          console.error('Ошибка загрузки событий', error);
        }
      });
    } else {
      this.events = JSON.parse(storedEvents);
    }
  }

  private initializeGoals() {
    const storedGoals = localStorage.getItem('goals');

    if (!storedGoals) {
      this.dataService.getData<IGoal[]>(this.goalsUrl).subscribe({
        next: (goals: IGoal[]) => {
          console.log('Загруженные цели:', goals);
          localStorage.setItem('goals', JSON.stringify(goals));
          this.goals = goals;
        },
        error: (error) => {
          console.error('Ошибка загрузки целей', error);
        }
      });
    } else {
      this.goals = JSON.parse(storedGoals);
    }
  }

  private initializeTransactions() {
    const storedTransactions = localStorage.getItem('trans');

    if (!storedTransactions) {
      this.dataService.getData<Transaction[]>(this.transactionsUrl).subscribe({
        next: (transactions: Transaction[]) => {
          console.log('Загруженные транзакции:', transactions);
          localStorage.setItem('trans', JSON.stringify(transactions));
          this.transactions = transactions;
          this.calculateFinancialSummary();
        },
        error: (error) => {
          console.error('Ошибка загрузки транзакций', error);
        }
      });
    } else {
      this.transactions = JSON.parse(storedTransactions);
      this.calculateFinancialSummary();
    }
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
