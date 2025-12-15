import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Bookdetails } from './bookdetails/bookdetails';
import { Bookreader } from './bookreader/bookreader';
import { Register } from './register/register';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  // Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Public routes
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Protected routes
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'book/:id', component: Bookdetails, canActivate: [AuthGuard] },
  { path: 'read/:id', component: Bookreader, canActivate: [AuthGuard] },

  // Fallback (redirect any unknown path to login)
  { path: '**', redirectTo: 'login' },
];
