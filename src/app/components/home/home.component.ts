import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  private routeSub !: Subscription;
  private gameSub !: Subscription;
  public sort !: string;
  public games !: Array<Game>;
  constructor(
    private httpService: HttpService,
    private route: Router,
    private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

    searchGames(sort: string, search?: string) {
      this.httpService
        .getGameList(sort, search)
        .subscribe((gameList: APIResponse<Game>) => {
          this.games = gameList.results;
          console.log(gameList)
        });
      }
  openGameDetails(id: string): void {
        this.route.navigate(['details',id]);
      }
    ngOnDestroy(): void {
      if(this.gameSub){
        this.gameSub.unsubscribe();
      }
      if (this.routeSub){
        this.routeSub.unsubscribe();
      }
    }
}
