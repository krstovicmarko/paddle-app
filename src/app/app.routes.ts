import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../components/home/home.component';
import { UnimplementedComponent } from '../components/unimplemented/unimplemented.component';
import { BookACourtComponent } from '../components/book-a-court/book-a-court.component';

export const routes: Routes = [
    {path: 'home', component:HomeComponent},
    {path:'', redirectTo: '/home', pathMatch: 'full'},
    {path: 'unimplemented', component:UnimplementedComponent},
    {path: 'book-a-court/:id', component:BookACourtComponent},
];
