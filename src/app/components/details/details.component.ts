import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameRating = 0
  gameId!: string;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;
  constructor(
    private httpService: HttpService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params : Params)=> {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getColor(value: number): string {
    if(value > 75){
      return '#8FBC8F'
    }else if (value > 50){
      return '#FF8C00'
    }else if(value > 30){
      return '#8B0000'
    }else {
      return '#FF1493'
    }
  }
  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        });
      });
  }
}
