import { Injectable } from '@angular/core';
import { Song } from '../../interfaces/song';
import { DatabaseService } from '../database/database.service';
import { DatabaseUrlService } from '../database-url/database-url.service';
import { EmissionService } from '../emission/emission.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/take';


@Injectable()
export class SongsService {
  private last_fm_api_key = 'c2e1ac3c2c54e9ca6b1f629b39390e0c';
  private songSubscription: Subscription;
  constructor(private dbService: DatabaseService,
    private dbUrlService: DatabaseUrlService,
    private emissionService: EmissionService,
    private http: HttpClient) { }

  getSong(key: string) {
    return this.dbService.getObject(this.dbUrlService.getSongsPath(), key);
  }

  getSongs(listOfKeys) {
    const nominatedSongs: Song[] = [];
    this.dbService.getList(this.dbUrlService.getSongsPath()).subscribe((snapshot) => {
      snapshot.forEach((song) => {
        if (listOfKeys.indexOf(song.$key) > -1) {
          nominatedSongs.push(song);
        }
      });
    });
    return nominatedSongs;
  }

  // Application name	RadioApp
  // API key	c2e1ac3c2c54e9ca6b1f629b39390e0c
  // Shared secret	8652163bfae49ae653c7ff9aea65ecd4
  // Registered to	Gandaldorf
  // http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=c2e1ac3c2c54e9ca6b1f629b39390e0c&artist=at+the+gates&album=slaughter+of+the+soul&format=json
  getAlbumInfo(artist: string, album: string) {
    artist = artist.replace(' ', '+');
    album = album.replace(' ', '+');
    return this.http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key='+this.last_fm_api_key+'&artist='+artist+'&album='+album+'&lang=spa&format=json');
  }

  getVotesSong(keyOfSong: string) {
    return this.dbService.getObject(this.dbUrlService.getEmissionsPath(), keyOfSong);
  }

  voteSong(keyOfSong: string){
    this.songSubscription = this.dbService.getObject(this.dbUrlService.getActiveEmissionPath(), keyOfSong).take(1).subscribe((activeEmission) => {
      const nominated_votes = activeEmission.nominated_votes + 1;
      this.dbService.update(this.dbUrlService.getActiveEmissionPath(), keyOfSong, { nominated_votes: nominated_votes});
    });
  }

  ngOnDestroy() {
    this.songSubscription.unsubscribe();
  }
}
