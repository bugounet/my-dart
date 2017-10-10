import { Injectable } from '@angular/core';

import {Player} from "../models/player.model";

@Injectable()
export class PlayerService {
    players: Object = {};
    players_count: number = 0;

    is_player_name_valid(proposed_player_name): boolean {
        // the following regex stands for a classical word lookup (\w) but also
        // supports latin accented letters since european players can have
        // accents in their name
        var accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
        // potential optim: compile this regex only once at script loading
        // however, I guess modern compilers would optimize it using JIT tech
        // for me.
        var regex = new RegExp("^[a-zA-Z0-9" + accentedCharacters + "]+$");
        return proposed_player_name.match(regex) as boolean;
    }


    create_player(name): Promise<Player> {
        this.players_count++;
        let new_guy = {id:this.players_count, name:name, score:0} as Player;
        this.players[new_guy.id] = new_guy;
        return new Promise(
            resolve => {
                // Simulate server latency with delay
                setTimeout(() => resolve(new_guy), 300);
            }
        )
    };

    remove_player(player_id): Promise<Player> {
        var removed = this.players[player_id];
        delete this.players[player_id];
        return new Promise(
            resolve => {
                // Simulate server latency with delay
                setTimeout(() => resolve(removed), 300);
            }
        )
    }

    get_players(): Promise<Array<Player>> {
        var array = [];
        for(let player in this.players){
            array.push(this.players[player]);
        }
        return new Promise(
            resolve => {
                // Simulate server latency with delay
                setTimeout(() => resolve(array), 300);
            }
        )
    }

    get_player(id): Promise<Player> {
        return new Promise(
            resolve => {
                // Simulate server latency with delay
                setTimeout(() => resolve(this.players[id]), 300);
            }
        )
    }

}