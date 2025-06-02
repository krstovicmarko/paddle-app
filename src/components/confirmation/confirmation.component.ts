import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

  constructor(
              private route: ActivatedRoute, 
              private localStorageService: LocalStorageService,
              private routerService: RouterService
            ) {}

  type: string = ""
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') as string;

      setTimeout(() => {
        if (this.type == "booked") {
          this.routerService.navigateTo('home');
        }
      }, 2500)
    });
  }
}
