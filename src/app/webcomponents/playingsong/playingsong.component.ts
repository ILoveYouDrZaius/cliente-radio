import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs/songs.service';
import { EmissionService } from '../../services/emission/emission.service';
import { Song } from '../../interfaces/song';
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

  constructor(private songsService: SongsService,
              private emissionService: EmissionService) {
    this.emissionService.getActiveEmission().subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        this.keySongPlaying = snapshot.$key;
      });
      this.songsService.getSong(this.keySongPlaying).subscribe((snapshot) => {
        this.winnerSong = snapshot;
      });
    });
  }

  ngOnInit() {
  }

}
