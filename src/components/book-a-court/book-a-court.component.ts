import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from '../../model/court';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-a-court',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-a-court.component.html',
  styleUrl: './book-a-court.component.css'
})
export class BookACourtComponent {
  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService) {}

  court?: Court;
  playerName: string = "          ";
  selectedMatchType: string = "single";
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      let id = Number(params.get('id') as string);
      let courts = this.localStorageService.getItem("courts") as Court[];
      for (let c of courts) {
        if (c.id == id) {
          this.court = c;
          break;
        }
      }
    });
  }

  log(a: any) {
    console.log(this.selectedMatchType);
  }

  workingHours(): string {
    let start = this.court!.work_hours_start;
    let end = this.court!.work_hours_end;
    let startStr = start + "AM";
    let endStr = end + "AM";
    if (start >= 12) {
      startStr = (start - 12) + "PM";
    }

    if (end >= 12) {
      endStr = (end - 12) + "PM";
    }

    return startStr + " - " + endStr;
  }

  openSelect(selectElement: HTMLSelectElement) {
    selectElement.focus();
    selectElement.click();
  }
}
