/**
 * Created by bugounet on 09/10/2017.
 */
import { Injectable, OnInit } from '@angular/core';

import {Player} from "../models/player.model";

@Injectable()
export class GameService implements OnInit {
    players: Array<Player> = [];
    target_score: number = 0;
    scores: Object = {};
    current_player_index: number = 0;
    current_player: Player = null;
    winner: Player = null;

    public ngOnInit(): void {
        this.reset(true);
    };

    public is_ready(): boolean {
        /* since the game can be accessed for any URL, the gaming service has
        to be able to say whether it's ready to play or not (i.e. if it's
        been initialized or not)
         */
        return ! (this.players.length === 0 || this.target_score === 0);
    }

    public play_again(): void {
        this.reset(false);
        for(let player of this.players) {
            this.scores[player.id] = {
                "name":player.name,
                "score": this.target_score
            };
        }
    }

    private reset(players_and_target=true): void {
        /* Sets all elements back to empty
        * */
        this.scores = {};
        this.current_player_index = 0;
        this.current_player = null;
        this.winner = null;
        if(players_and_target) {
            this.players = [];
            this.target_score = 0;
        }
    }

    public new_game(target_score, players_list): void {
        console.log("target score", target_score, "players_list", players_list);
        this.reset();
        this.target_score = target_score;
        this.players = players_list;
        this.current_player = players_list[0];
        for(let player of players_list) {
            this.scores[player.id] = {
                "name":player.name,
                "score": target_score
            };
        }
        this.winner = null;
    }

    public add_score(score): number {
        /* return remaining score... Player wing if this function returns 0 */
        var current_score = this.scores[this.current_player.id];
        var remaining = current_score.score;
        if (current_score.score >= score) {
            remaining = current_score.score - score;
        }
        this.scores[this.current_player.id].score = remaining;
        if (remaining == 0) {
            this.winner = this.current_player
        }
        return remaining;
    }

    public next_player(): void {
        this.current_player_index = (this.current_player_index + 1) % this.players.length;
        this.current_player = this.players[this.current_player_index];
    }

    public get_winner(): Player {
        return this.winner;
    }


    public parse_score_string(score_string): number {
        /* Parses a string containing a potential score number & checks if
         it belong to expectable score-range (i.e. 0 <= score <= 180)
          */

        // using a regex instead of a native Number() cast to be able to parse
        // a natural integer without dealing with Math lib. I'm not used to
        // such JS operations
        if(!score_string.match(/^\d+$/)) {
            throw "Score must be a positive integer number";
        }
        // parsed data cannot be negative of floating since we used a regex
        // looking only for digits
        var score = Number(score_string);
        if (score > 180) {
            throw "Score cannot be greater than 180. You're cheating dude!";
        }

        return score;
    }

}
