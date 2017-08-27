import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../../../services/songs/songs.service';
import { EmissionService } from '../../../services/emission/emission.service';
import { Song } from '../../../interfaces/song';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-playingsong',
  templateUrl: './playingsong.component.html',
  styleUrls: ['./playingsong.component.css'],
  providers: [ SongsService ]
})
export class PlayingsongComponent implements OnInit {
  private winnerSong: FirebaseObjectObservable<any>;
  public songs: FirebaseListObservable<any>;
  private keySongPlaying: string;
  private albumCoverUrl: string;
  private genreName: string;
  private genreUrl: string;
  private muteAudio: boolean;
  closeResult: string;

  constructor(private songsService: SongsService,
              private emissionService: EmissionService) {
  }

  ngOnInit() {
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
      });
    });
  }

  mute() {
    const audio = document.getElementById('audioplayer');
    (<HTMLAudioElement>audio).muted = (!(<HTMLAudioElement>audio).muted);
    this.muteAudio = (<HTMLAudioElement>audio).muted;
  }

}
