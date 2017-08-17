import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs/songs.service';
import { EmissionService } from '../../services/emission/emission.service';
import { Song } from '../../interfaces/song';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-nominatedsongs',
  templateUrl: './nominatedsongs.component.html',
  styleUrls: ['./nominatedsongs.component.css'],
  providers: [ SongsService, EmissionService ]
})
export class NominatedsongsComponent implements OnInit {
  private nominatedSongs: any[] = [];
  private votesSong: Song[] = [];
  private canciones;

  constructor(private songsService: SongsService,
    private emissionService: EmissionService) {
    const nominatedSongsKeys = [];
    this.emissionService.getNominatedEmissions().subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        nominatedSongsKeys.push(snapshot.$key);
      });
      if (nominatedSongsKeys.length === 3) {
        this.canciones = this.songsService.getSongs(nominatedSongsKeys);
        this.canciones.forEach((song) => {
          console.log('ok');
        });
      }
    });
  }

  voteSong(key) {
    console.log('voto a ', key);
    return this.songsService.getVotesSong(key);
  }

  ngOnInit() {
  }

}
