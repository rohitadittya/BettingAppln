import { Component, OnInit } from '@angular/core';
import { CodeApiService } from './service/code-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private codeApi: CodeApiService){

  }
  ngOnInit(): void {
    this.codeApi.generateRandomBet();
  }
  title = 'coda-betting';

  
}
