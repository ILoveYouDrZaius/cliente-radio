import { Injectable } from '@angular/core';
import { DatabaseUrlService } from '../database-url/database-url.service';
import { DatabaseService } from '../database/database.service';
import { User } from '../../interfaces/user';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
  constructor(private dbService: DatabaseService, private dbUrlService: DatabaseUrlService) { }

  getUserName(key: string): Observable<any> {
    return Observable.create((observer) => {
      this.dbService.getObject(this.dbUrlService.getUsersPath(), key).subscribe((data) => {
        observer.next(data['username']);
      });
    });
  }

  getUsersConnectedList() {
    return this.dbService.getList(this.dbUrlService.getUsersPath(), {
      orderByChild: 'connected',
      equalTo: true,
    });
  }

  songIsFavourite(keyUser: string, keySong: string) {
    return this.dbService.getObject(this.dbUrlService.getUsersPath(), keyUser);
  }

  addFavouriteSong(keyUser: string, keySong: string) {
    this.dbService.getObject(this.dbUrlService.getUsersPath(), keyUser).subscribe(snapshot => {
      try{ 
        if (!snapshot.favourites[keySong]) { 
          this.dbService.createWithKey(this.dbUrlService.getUsersPath() + '/' + keyUser + '/favourites/', keySong, true);
        }
      }
      catch (e){
        if(e instanceof TypeError){
          this.dbService.createWithKey(this.dbUrlService.getUsersPath() + '/' + keyUser + '/favourites/', keySong, true);
        }
      }
    }).unsubscribe();
  }

  removeFavouriteSong(keyUser: string, keySong: string) {
    this.dbService.remove(this.dbUrlService.getUsersPath(), keyUser + '/favourites/' + keySong).subscribe(result => {
      console.log(result);
    }).unsubscribe();
  }
}
