import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  auth = inject(Auth);
}
