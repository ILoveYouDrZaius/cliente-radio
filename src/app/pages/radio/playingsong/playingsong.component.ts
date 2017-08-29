import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../../../services/songs/songs.service';
import { EmissionService } from '../../../services/emission/emission.service';
import { UsersService } from '../../../services/users/users.service';
import { Song } from '../../../interfaces/song';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-playingsong',
  templateUrl: './playingsong.component.html',
  styleUrls: ['./playingsong.component.css'],
  providers: [ SongsService, UsersService ]
})
export class PlayingsongComponent implements OnInit {
  private winnerSong: FirebaseObjectObservable<any>;
  public songs: FirebaseListObservable<any>;
  private keySongPlaying: string;
  private albumCoverUrl: string;
  private genreName: string;
  private genreUrl: string;
  private muteAudio: boolean;
  private _loginStatus: boolean;
  private userKey: string;
  private favouriteSong: boolean;
  closeResult: string;

  constructor(private songsService: SongsService,
              private usersService: UsersService,
              private emissionService: EmissionService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.userKey = this.auth.getCurrentUserId();
      }
    });
    this.emissionService.getActiveEmission().subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        this.keySongPlaying = snapshot.$key;
      });
      this.songsService.getSong(this.keySongPlaying).subscribe((snapshot) => {
        const artist: string = snapshot.artist[0];
        const album: string = snapshot.album;
        this.songsService.getAlbumInfo(artist, album).subscribe((data) => {
          this.albumCoverUrl = data['album']['image'][2]['#text'];
          this.genreName = data['album']['tags']['tag'][0]['name'];
          this.genreUrl = data['album']['tags']['tag'][0]['url'];
          this.genreUrl =  this.genreUrl.substr(0, 1).toUpperCase() + this.genreUrl.substr(1);
        });
        this.winnerSong = snapshot;
        this.usersService.songIsFavourite(this.userKey, snapshot.$key).subscribe(snap => {
          try {
            if (snap.favourites[snapshot.$key]) {
              this.favouriteSong = true;
            } else {
              this.favouriteSong = false;
            }
          } catch (e) {
            this.favouriteSong = false;
          }
        });
      });
    });
  }

  mute() {
    const audio = document.getElementById('audioplayer');
    (<HTMLAudioElement>audio).muted = (!(<HTMLAudioElement>audio).muted);
    this.muteAudio = (<HTMLAudioElement>audio).muted;
  }

  favouriteButton(songKey) {
    if (!this.favouriteSong){
      this.usersService.addFavouriteSong(this.userKey, songKey);
      this.favouriteSong = true;
    }else{
      this.usersService.removeFavouriteSong(this.userKey, songKey);
      this.favouriteSong = false;
    }
  }

}
