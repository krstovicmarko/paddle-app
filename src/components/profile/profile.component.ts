import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterService } from '../../services/router.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../model/user';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Court } from '../../model/court';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {


  constructor(private localStorageService: LocalStorageService, private routerService: RouterService,
              private route: ActivatedRoute, private authService: AuthenticationService
  ) {}


  id: number = -1;
  user: User =  this.authService.currentUserValue;
  currentUser: User = this.authService.currentUserValue;
  users: User[] = this.localStorageService.getItem("users") as User[];
  courts: Court[] = this.localStorageService.getItem("courts") as Court[];
  ngOnInit() {
    this.route.paramMap.subscribe(params  => {
      this.id = Number(params.get("id"));
      
      // for (let user of this.users) {
      //   if (this.id == user.id) {
      //     this.user = user;
      //     // console.log(this.user.points);
      //     break;
      //   }
      // }
    });
    const canvas = document.getElementById('graph') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Sample data
    const data = [50, 80, 40, 90, 60];
    const labels = ['League 5', 'League 4', 'League 3', 'League 2', 'League 1'];
  
    const padding = 30;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
  
    // Calculate scaling
    const maxData = Math.max(...data);
    const stepX = chartWidth / (data.length - 1);
    const scaleY = chartHeight / maxData;
  
    // Draw Axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
  
    // Draw Line Graph
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding - data[0] * scaleY);
    for (let i = 1; i < data.length; i++) {
      const x = padding + i * stepX;
      const y = canvas.height - padding - data[i] * scaleY;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  
    // Draw Points
    for (let i = 0; i < data.length; i++) {
      const x = padding + i * stepX;
      const y = canvas.height - padding - data[i] * scaleY;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }
  
    // Draw Labels
    ctx.font = '10px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    for (let i = 0; i < labels.length; i++) {
      const x = padding + i * stepX;
      const y = canvas.height - padding + 15;
      ctx.fillText(labels[i], x, y);
    }

  }


  toggleAvailability() {
    this.currentUser.availableToPlay = !this.currentUser.availableToPlay;
    this.localStorageService.setItem("currentUser", this.currentUser);

    this.changeCurrentUserInUsers();
  }

  onSelectionChange(event: Event) {
    this.localStorageService.setItem("currentUser", this.currentUser);
    this.changeCurrentUserInUsers();
  }

  changeCurrentUserInUsers() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id == this.currentUser.id) {
        this.users[i] = this.currentUser
        this.localStorageService.setItem("users", this.users);
      }
    }
  }
}
