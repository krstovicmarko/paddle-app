import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { UnimplementedComponent } from '../components/unimplemented/unimplemented.component';
import { BookACourtComponent } from '../components/book-a-court/book-a-court.component';
import { InvitePlayersComponent } from '../components/invite-players/invite-players.component';
import { ConfirmMatchComponent } from '../components/confirm-match/confirm-match.component';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { SearchPlayersComponent } from '../components/search-players/search-players.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { MatchHistoryComponent } from '../components/match-history/match-history.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path: 'unimplemented', component:UnimplementedComponent},
    {path: 'book-a-court/:id', component:BookACourtComponent},
    {path: 'invite-players/:idx', component:InvitePlayersComponent},
    {path: 'confirm-match', component:ConfirmMatchComponent},
    {path: 'confirmation/:type', component:ConfirmationComponent},
    {path: 'search-players/:idx', component:SearchPlayersComponent},
    {path: 'notification', component:NotificationComponent},
    {path: 'match-history', component:MatchHistoryComponent},
];
