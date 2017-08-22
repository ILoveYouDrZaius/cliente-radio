import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../../../services/songs/songs.service';
import { EmissionService } from '../../../services/emission/emission.service';
import { Song } from '../../../interfaces/song';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string;

  constructor(private songsService: SongsService,
              private emissionService: EmissionService,
              private modalService: NgbModal) {
    this.emissionService.getActiveEmission().subscribe((snapshots) => {
      snapshots.forEach((snapshot) => {
        this.keySongPlaying = snapshot.$key;
      });
      this.songsService.getSong(this.keySongPlaying).subscribe((snapshot) => {
        const artist: string = snapshot.artist[0];
        const album: string = snapshot.album;
        this.songsService.getAlbumInfo(artist, album).subscribe((data) => {
          this.albumCoverUrl = data['album']['image'][2]['#text'];
        });
        this.winnerSong = snapshot;
      });
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
  }

}
