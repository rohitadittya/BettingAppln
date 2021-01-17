import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { BettingInterface } from 'src/app/Model/betting.model';
import { CodeApiService } from 'src/app/service/code-api.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, OnDestroy {
  selectedPlayers:BettingInterface[] = [];
  playersWon:BettingInterface[] = [];
  bet;
  firstFivePlayers:BettingInterface[] =[];
  lastFourPlayers:BettingInterface[] =[];
  constructor(private codaApi: CodeApiService) { }
  ngOnDestroy(): void {
    this.codaApi.updatePlayerDetails(this.selectedPlayers);
    this.codaApi.selectedPlayers=[];
    this.codaApi.selectedPlayers$.next([])
  }

  ngOnInit(): void {
    this.codaApi.selectedPlayers$.subscribe(players => {
      this.selectedPlayers = players;
      this.bet = this.codaApi.randomBet;
      this.selectedPlayers.map(p => {
        if(p.Bet == this.codaApi.randomBet) {
          p.Won = true;
          p.Price = p.Price * 2;
          p.Wins = p.Wins + 1;
        } else {
          p.Price = 0;
          p.Lost = p.Lost+1; 
        }
      })
      
      this.firstFivePlayers = this.selectedPlayers.slice(0,5);
      this.lastFourPlayers = this.selectedPlayers.slice(5,9)
    })
  }

}
