import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { BettingInterface } from '../Model/betting.model';

@Injectable({
  providedIn: 'root'
})
export class CodeApiService {

  randomBet:number = 0;
  bettingData:BettingInterface[] = [];
  selectedPlayers:BettingInterface[] = [];

  selectedPlayers$ = new BehaviorSubject<BettingInterface[]>([]);

  constructor(private http: HttpClient) { 
     
  }

  getBettingData(): any {
    return this.http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json');
  }

  setBettingData(data){
    this.bettingData = data;
  }

  setBettingPlayer(ind, eleData){
    if(this.selectedPlayers.length > 0) {
      let checked = false;
    this.selectedPlayers.map((data,i)=>{
      if(data.Ind == ind) {
        this.selectedPlayers.splice(i,1);
        checked = true;
        this.selectedPlayers$.next(null);
        this.selectedPlayers$.next(this.selectedPlayers);  
      } 

    })

    if(!checked) {
      this.selectedPlayers.push(eleData);
      this.selectedPlayers$.next(null);
      this.selectedPlayers$.next(this.selectedPlayers);  
    }
  } else {
    this.selectedPlayers.push(eleData)
    this.selectedPlayers$.next(null);

    this.selectedPlayers$.next(this.selectedPlayers);

  }
  }

  generateRandomBet() {
    this.randomBet = Math.floor((Math.random() * 9) + 1);
  }

  updatePlayerDetails(selectedPlayers: BettingInterface[]) {  
    this.bettingData.map(p => {
      selectedPlayers.map(selectPlayer => {
        if(selectPlayer.Ind == p.Ind) {
          p=selectPlayer;
        }
      })
    })
  }
}
