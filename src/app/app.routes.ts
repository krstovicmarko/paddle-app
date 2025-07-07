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
import { ClubMembershipComponent } from '../components/club-membership/club-membership.component';
import { MyClubComponent } from '../components/my-club/my-club.component';
import { PromotionsComponent } from '../components/promotions/promotions.component';
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
    {path: 'notification', component:NotificationComponent, canActivate: [AuthGuard]},
    {path: 'match-history', component:MatchHistoryComponent, canActivate: [AuthGuard]},
    {path: 'available-players/:id/:idx', component:AvailablePlayersComponent, canActivate: [AuthGuard]},
    {path: 'profile/:id', component:ProfileComponent, canActivate: [AuthGuard]},
    {path: 'edit-profile', component:EditProfileComponent, canActivate: [AuthGuard]},
    {path: 'your-match', component:YourMatchComponent, canActivate: [AuthGuard]},
    {path: 'employee-interface', component:EmployeeInterfaceComponent, canActivate: [AuthGuard]},
    {path: 'court-bookings', component:CourtBookingsComponent, canActivate: [AuthGuard]},
    {path: 'match-confirmations', component:MatchConfirmationsComponent, canActivate: [AuthGuard]},
    {path: 'system-alerts', component:SystemAlertsComponent, canActivate: [AuthGuard]},
    {path: 'due-payments', component:DuePaymentsComponent, canActivate: [AuthGuard]},
    {path: 'friendships', component: FriendshipsComponent, canActivate: [AuthGuard]},
    {path: 'club-membership', component:ClubMembershipComponent, canActivate: [AuthGuard]},
    {path: 'my-club/:id', component:MyClubComponent, canActivate: [AuthGuard]},
    {path: 'promotions/:idClub', component:PromotionsComponent, canActivate: [AuthGuard]},
     {path: 'login', component:LoginComponent}
];
