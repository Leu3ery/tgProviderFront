import { Component } from '@angular/core';
import { config } from '../../../environment';

@Component({
  selector: 'app-no-tg',
  imports: [],
  templateUrl: './no-tg.html',
  styleUrl: './no-tg.css'
})
export class NoTg {
  config = config;
}
