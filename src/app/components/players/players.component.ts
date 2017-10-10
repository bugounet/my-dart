import { Component, OnInit } from '@angular/core';
import {Player} from "../../models/player.model";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})

export class PlayersComponent implements OnInit {

    constructor(
        private player_service: PlayerService
    ) { }

    players: Array<Player>;
    new_player_name: string;
    player_name_error: string;
    loading: boolean;

    public ngOnInit(): void {
        this.players = [];
        this.loading = true;
        this.new_player_name = "";
        this.player_name_error = "";
        this.player_service.get_players().then((players) => {
            this.players = players;
            this.loading = false;
        });
    }

    public add_player(): void {

        if (!this.player_service.is_player_name_valid(this.new_player_name)) {
            this.player_name_error = "Player name must be composed with letters or digits";
            return;
        }
        this.player_name_error = "";
        this.player_service.create_player(this.new_player_name).then((player)=>{
            this.players.push(player);
            this.new_player_name = "";
        });
    }

    public delete_player(player): void {
        this.player_service.remove_player(player.id).then((player_id)=>{
            var idx = this.players.indexOf(player);
            if(idx !== -1) {
                this.players.splice(idx);
            }
        })
    }
}