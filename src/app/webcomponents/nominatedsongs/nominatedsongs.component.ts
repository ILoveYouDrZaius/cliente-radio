import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs/songs.service';
import { EmissionService } from '../../services/emission/emission.service';
import { Song } from '../../interfaces/song';
import { NominatedSong } from '../../interfaces/nominated-song';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-nominatedsongs',
  templateUrl: './nominatedsongs.component.html',
  styleUrls: ['./nominatedsongs.component.css'],
  providers: [ SongsService, EmissionService ]
})
export class NominatedsongsComponent implements OnInit {
  private nominatedSongs: NominatedSong[] = [];
  private votesSong: Song[] = [];
  private canciones;

  constructor(private songsService: SongsService,
    private emissionService: EmissionService) {
    const nominatedSongsKeys = [];
    this.emissionService.getNominatedEmissions().subscribe((snapshots) => {
      this.nominatedSongs = [];
      snapshots.forEach((snapshot) => {
        const tempSongNominated: NominatedSong = {votes: 0, title: ''};
        songsService.getSong(snapshot.$key).subscribe((song) => {
          let repeatedSong = false;
          tempSongNominated.$key = song.$key;
          tempSongNominated.title = song.title;
          tempSongNominated.votes = snapshot.nominated_votes;
          
          this.nominatedSongs.forEach((song) => {
            if (song.title === tempSongNominated.title) {
              repeatedSong = true;
            }
          });
          if (!repeatedSong) {
            this.nominatedSongs.push(tempSongNominated);
          }
        });
      });
    });
  }

  voteSong(key) {
    this.songsService.voteSong(key);
    return this.songsService.getVotesSong(key);
  }

  ngOnInit() {
  }

}
