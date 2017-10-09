import {Component, OnInit} from '@angular/core';
import {Player} from "../../models/player.model";
import {GameService} from "../../services/game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit{
    /** Game compoenent is the score tracking app itself. It
     * sums-up all onslaughts of each player and counts down till we have a
     * winner.
     */
    constructor(
        private game_service: GameService,
        private router: Router
    ) { }

    // Copy local data to avoid using signals & trigger view updates on-the-go
    winner: Player;
    players : Array<Player>;
    current_player: Player;
    target_score: number;
    scores: Object;

    // Using two way data binding to get data from view and submit a score
    new_score: string;
    score_error: string;

    public ngOnInit(): void {
        console.log("Running init : ", this.game_service.is_ready(), this.game_service.players, this.game_service.target_score)
        if(!this.game_service.is_ready()) {
            this.router.navigate(['/players']);
        }
        this.players = this.game_service.players;
        this.target_score = this.game_service.target_score;
        this.fetch();
        this.new_score = "";
        this.score_error = "";
    }

    mark_current_onslaught(): void {
        // Take number from input bound, check input data, and trigger events
        // onto game_service instance
        try {
            var score = this.game_service.parse_score_string(this.new_score);
        } catch(e) {
            this.score_error = e;
            return;
        }
        this.new_score = "";
        this.score_error = "";
        this.game_service.add_score(score);
        this.game_service.next_player();
        this.fetch();
    }

    fetch(): void {
        // Fetch common data back to controller's bound variables so that the
        // template get refreshed with new values
        this.current_player = this.game_service.current_player;
        this.scores = this.game_service.scores;
        this.winner = this.game_service.winner;
    }

    retry(): void {
        this.game_service.play_again();
        this.fetch();
    }
}

