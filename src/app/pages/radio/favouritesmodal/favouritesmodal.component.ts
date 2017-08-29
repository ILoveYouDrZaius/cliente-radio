import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../services/users/users.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Song } from '../../../interfaces/song';
import { SongsService } from '../../../services/songs/songs.service';

@Component({
  selector: 'app-favouritesmodal',
  templateUrl: './favouritesmodal.component.html',
  styleUrls: ['./favouritesmodal.component.css']
})
export class FavouritesmodalComponent implements OnInit {
  closeResult: string;
  private userKey: string;
  private _loginStatus: boolean;
  private favouriteSongs: Song[] = [];

  constructor(private songsService: SongsService,
              private modalService: NgbModal,
              private usersService: UsersService,
              private auth: AuthService) { }

  ngOnInit() {
    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.userKey = this.auth.getCurrentUserId();
      }
      this.usersService.getFavouritesSongs(this.userKey).subscribe((snapshots) => {
        this.favouriteSongs = [];
        snapshots.forEach((snapshot) => {
          const tempSong: Song = { title: '', artist: '', album: '' };
          this.songsService.getSong(snapshot.$key).subscribe((song) => {
            let repeatedSong = false;
            tempSong.$key = song.$key;
            tempSong.title = song.title;
            tempSong.artist = song.artist;
            tempSong.album = song.album;

            this.favouriteSongs.forEach((_song) => {
              if (_song.title === tempSong.title) {
                repeatedSong = true;
              }
            });
            if (!repeatedSong) {
              this.favouriteSongs.push(tempSong);
            }
          });
        });
      });
    });
  }

  removeFavourite(songKey: string) {
    this.usersService.removeFavouriteSong(this.userKey, songKey);
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
      return `with: ${reason}`;
    }
  }

}
