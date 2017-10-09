import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {PlayersComponent} from "./components/players/players.component";
import {GameSelectionComponent} from "./components/game_selection/game_selection.component";
import {GameComponent} from "./components/game/game.component";
import {GameService} from "./services/game.service";
import {PlayerService} from "./services/player.service";
import {ValuesPipe} from "./pipe.module";


@NgModule({
  declarations: [
    AppComponent,
      PlayersComponent,
      GameSelectionComponent,
      GameComponent,
      ValuesPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'players',
        component: PlayersComponent,
      },
      {
        path: 'mode',
        component: GameSelectionComponent,
      },
      {
        path: 'game',
        component: GameComponent,
      },
      {
        path: '',
        redirectTo: '/players',
        pathMatch: 'full'
      }
    ])
  ],
  providers: [
      GameService,
      PlayerService
  ],
  bootstrap: [
      AppComponent
  ]
})

export class AppModule { }
