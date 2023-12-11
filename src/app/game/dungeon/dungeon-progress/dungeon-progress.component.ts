import {Component, Input} from '@angular/core';
import {Dungeon} from "../../../common/dungeon.interface";

@Component({
  selector: 'app-dungeon-progress',
  templateUrl: './dungeon-progress.component.html',
  styleUrls: ['./dungeon-progress.component.css']
})
export class DungeonProgressComponent {
  @Input() dungeon?: Dungeon;
}
