import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {DungeonDifficultyComponent} from './game/dungeon/dungeon-difficulty/dungeon-difficulty.component';
import {HeroStatsComponent} from './game/hero/hero-stats/hero-stats.component';
import {DungeonProgressComponent} from './game/dungeon/dungeon-progress/dungeon-progress.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { HeroRestingComponent } from './game/hero/hero-resting/hero-resting.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    DungeonDifficultyComponent,
    HeroStatsComponent,
    DungeonProgressComponent,
    HeroRestingComponent,
  ],
  imports: [
    BrowserModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
