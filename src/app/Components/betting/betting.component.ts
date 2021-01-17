import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { BettingInterface } from 'src/app/Model/betting.model';
import { CodeApiService } from 'src/app/service/code-api.service';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent implements OnInit {

  dataSource;
  selectedPlayers:BettingInterface[] = [];
  constructor(private codaApi: CodeApiService) { }
  
  displayedColumns: string[] = ['select', 'player name', 'level', 'avatar', 'bet', 'wins', 'lost', 'price'];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    if(this.codaApi.bettingData.length<1){
    this.codaApi.getBettingData().subscribe(
      (res)=>{
        res.map((data,i) => {
          data.Ind = i;
          data.Level = 0;
          data.Wins = 0;
          data.Lost = 0;
        })
        this.codaApi.setBettingData(res);
        this.dataSource = new MatTableDataSource<BettingInterface>(res);
        this.dataSource.paginator = this.paginator;
      }
    )} else {
      this.dataSource = new MatTableDataSource<BettingInterface>(this.codaApi.bettingData);
    }

    this.codaApi.selectedPlayers$.subscribe(players => {
      this.selectedPlayers = players;
    })
  }


  onSelect(i, eleData){
    this.codaApi.setBettingPlayer(i, eleData);
  }

}