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
import { AvailablePlayersComponent } from '../components/available-players/available-players.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { YourMatchComponent } from '../components/your-match/your-match.component';
import { EmployeeInterfaceComponent } from '../components/employee-interface/employee-interface.component';
import { CourtBookingsComponent } from '../components/court-bookings/court-bookings.component';
import { MatchConfirmationsComponent } from '../components/match-confirmations/match-confirmations.component';
import { SystemAlertsComponent } from '../components/system-alerts/system-alerts.component';
import { DuePaymentsComponent } from '../components/due-payments/due-payments.component';
import { FriendshipsComponent } from '../components/friendships/friendships.component';

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
    {path: 'available-players/:id/:idx', component:AvailablePlayersComponent},
    {path: 'profile/:id', component:ProfileComponent},
    {path: 'edit-profile', component:EditProfileComponent},
    {path: 'your-match', component:YourMatchComponent},
    {path: 'employee-interface', component:EmployeeInterfaceComponent},
    {path: 'court-bookings', component:CourtBookingsComponent},
    {path: 'match-confirmations', component:MatchConfirmationsComponent},
    {path: 'system-alerts', component:SystemAlertsComponent},
    {path: 'due-payments', component:DuePaymentsComponent},
    {path: 'friendships', component: FriendshipsComponent},
];
