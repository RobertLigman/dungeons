import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {DungeonDifficultyComponent} from './game/dungeon-difficulty/dungeon-difficulty.component';
import {HeroStatsComponent} from './game/hero-stats/hero-stats.component';
import {DungeonProgressComponent} from './game/dungeon-progress/dungeon-progress.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { HeroRestingComponent } from './game/hero-resting/hero-resting.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    DungeonDifficultyComponent,
    HeroStatsComponent,
    DungeonProgressComponent,
    HeroRestingComponent
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
