import { Component } from '@angular/core';

@Component({
  selector: 'app-due-payments',
  standalone: true,
  imports: [],
  templateUrl: './due-payments.component.html',
  styleUrl: './due-payments.component.css'
})
export class DuePaymentsComponent {

  showDueThisMonth: boolean = false;
  showDayByDayInsights: boolean = false;
  showYearlyPayout: boolean = false;

}
