import {Component, Input} from '@angular/core';
import {Hero} from "../../interfaces/hero.interface";

@Component({
  selector: 'app-hero-stats',
  templateUrl: './hero-stats.component.html',
  styleUrls: ['./hero-stats.component.css']
})
export class HeroStatsComponent {
  @Input() heroStats?: Hero;
}
