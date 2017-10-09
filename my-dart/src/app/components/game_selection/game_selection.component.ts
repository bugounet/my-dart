import { Component, OnInit } from '@angular/core';
import {Player} from "../../models/player.model";
import {GameService} from "../../services/game.service";
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";

@Component({
  selector: 'game-selection',
  templateUrl: './game_selection.component.html',
  styleUrls: ['./game_selection.component.css'],
})

export class GameSelectionComponent implements OnInit {
    /** Game mode selection compoenent:
     * Here you pick between 101, 301, 501 game mode
     * **/
    constructor(
        private game_service: GameService,
        private player_service: PlayerService,
        private router: Router
    ) { }

    private players: Array<Player>;

    public ngOnInit(): void {
        this.player_service.get_players().then(
            (players) => {
                if (players.length < 2) {
                    this.router.navigate(['/players']);
                } else {
                    this.players = players;
                }
            }
        );
    }

    public new_game_clicked(target_score): void {
        console.log("this.players : ", this.players, target_score);
        this.game_service.new_game(target_score, this.players);
        this.router.navigate(['/game']);
    };
}
