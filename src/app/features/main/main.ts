import { Component, inject } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [JsonPipe],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
  auth = inject(Auth);

}
