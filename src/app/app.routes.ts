import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { UnimplementedComponent } from '../components/unimplemented/unimplemented.component';
import { BookACourtComponent } from '../components/book-a-court/book-a-court.component';
import { InvitePlayersComponent } from '../components/invite-players/invite-players.component';
import { ConfirmMatchComponent } from '../components/confirm-match/confirm-match.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { SearchPlayersComponent } from '../components/search-players/search-players.component';
import { AvailablePlayersComponent } from '../components/available-players/available-players.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { YourMatchComponent } from '../components/your-match/your-match.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from './auth-guard';


export const routes: Routes = [
    {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path: 'unimplemented', component:UnimplementedComponent},
    {path: 'book-a-court/:id', component:BookACourtComponent, canActivate: [AuthGuard]},
    {path: 'invite-players/:idx', component:InvitePlayersComponent, canActivate: [AuthGuard]},
    {path: 'confirm-match', component:ConfirmMatchComponent, canActivate: [AuthGuard]},
    {path: 'confirmation/:type', component:ConfirmationComponent, canActivate: [AuthGuard]},
    {path: 'search-players/:idx', component:SearchPlayersComponent, canActivate: [AuthGuard]},
    {path: 'available-players/:id/:idx', component:AvailablePlayersComponent, canActivate: [AuthGuard]},
    {path: 'profile/:id', component:ProfileComponent, canActivate: [AuthGuard]},
    {path: 'edit-profile', component:EditProfileComponent, canActivate: [AuthGuard]},
    {path: 'your-match', component:YourMatchComponent, canActivate: [AuthGuard]},
    {path: 'login', component:LoginComponent},
];
