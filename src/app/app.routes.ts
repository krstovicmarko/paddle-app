import { Routes } from '@angular/router';
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

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path: 'unimplemented', component:UnimplementedComponent},
    {path: 'book-a-court/:id', component:BookACourtComponent},
    {path: 'invite-players/:idx', component:InvitePlayersComponent},
    {path: 'confirm-match', component:ConfirmMatchComponent},
    {path: 'confirmation/:type', component:ConfirmationComponent},
    {path: 'search-players/:idx', component:SearchPlayersComponent},
    {path: 'available-players/:id/:idx', component:AvailablePlayersComponent},
    {path: 'profile/:id', component:ProfileComponent},
    {path: 'edit-profile', component:EditProfileComponent},
    {path: 'your-match', component:YourMatchComponent},
];
