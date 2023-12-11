import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-hero-resting',
  templateUrl: './hero-resting.component.html',
  styleUrls: ['./hero-resting.component.css']
})
export class HeroRestingComponent {
  @Input() heroHealth!: number;
}
