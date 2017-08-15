import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { DatabaseUrlService } from '../database-url/database-url.service';
import { EmissionService } from '../emission/emission.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SongsService {
  private last_fm_api_key = 'c2e1ac3c2c54e9ca6b1f629b39390e0c';
  constructor(private dbService: DatabaseService,
    private dbUrlService: DatabaseUrlService,
    private emissionService: EmissionService,
    private http: HttpClient) { }

  getList() {
    return this.dbService.getList(this.dbUrlService.getSongsPath());
  }

  getSong(key: string) {
    return this.dbService.getObject(this.dbUrlService.getSongsPath(), key);
  }

  // Application name	RadioApp
  // API key	c2e1ac3c2c54e9ca6b1f629b39390e0c
  // Shared secret	8652163bfae49ae653c7ff9aea65ecd4
  // Registered to	Gandaldorf
  // http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=c2e1ac3c2c54e9ca6b1f629b39390e0c&artist=at+the+gates&album=slaughter+of+the+soul&format=json
  getAlbumCover(artist: string, album: string) {
    artist = artist.replace(' ', '+');
    album = album.replace(' ', '+');
    return this.http.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key='+this.last_fm_api_key+'&artist='+artist+'&album='+album+'&format=json');
  }
}
