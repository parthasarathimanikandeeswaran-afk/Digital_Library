import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Login } from './login/login';
import { Home } from './home/home';
import { Register } from './register/register';
import { Bookdetails} from './bookdetails/bookdetails';
import { Bookreader } from './bookreader/bookreader';
import { Weatherforecast } from './weatherforecast';
import { AuthGuard } from './auth.guard';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('E-Library');

  weatherForecast:any[] = [];
  weatherForecastService=inject(Weatherforecast);

  constructor(){
  this.weatherForecastService.get().subscribe(weatherForecast=>{
    this.weatherForecast=weatherForecast;
  })
}
}
