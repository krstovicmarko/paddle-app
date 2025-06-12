import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Court } from '../../model/court';

@Component({
  selector: 'app-match-confirmations',
  standalone: true,
  imports: [],
  templateUrl: './match-confirmations.component.html',
  styleUrl: './match-confirmations.component.css'
})
export class MatchConfirmationsComponent {

  constructor(private localStorageService: LocalStorageService) {}

  court: Court = (this.localStorageService.getItem("courts") as Court[])[0];
  date: String = "";
  time: String = "";
  courtsConfirmed: number[] = [];
  ngOnInit() {
    const today = new Date();
    const day =  String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    this.date = `${day}.${month}.${year}.`;

    const hours = today.getHours();
    this.time = hours.toString().padStart(2, "0") + ":00";

    for (let i = 0; i < this.court.num_of_courts; i++) {
      this.courtsConfirmed.push(0);
    }
  }

}
