import { Injectable } from '@angular/core';
import { Message } from '../../interfaces/message';
import { DatabaseService } from '../database/database.service';
import { DatabaseUrlService } from '../database-url/database-url.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users/users.service';

@Injectable()
export class MessagesService {
  public messageObtained: FirebaseObjectObservable<Message>;
  public messageList: FirebaseListObservable<Message[]>;
  public keySearched: string;

  constructor(private dbService: DatabaseService,
    private dbUrlService: DatabaseUrlService,
    private http: HttpClient,
    private usersService: UsersService) { }

  getMessage() {
    this.messageObtained = this.dbService.getObject(this.dbUrlService.getMessagesPath(), this.keySearched);
  }

  getList() {
    return this.dbService.getList(this.dbUrlService.getMessagesPath());
  }

  removeMessage(key: string) {
    this.dbService.remove(this.dbUrlService.getMessagesPath(), key).subscribe((data) => {
      console.log(data);
    });
  }

  sendMessage(message: string, userKey: string) {
    console.log('Me llega esto: ', userKey, message);
    const msg: Message = {message: '', timestamp: 0, user: ''};
    msg.message = message;
    msg.user = userKey;
    console.log('Mensaje enviado: ', msg);
    this.dbService.create(this.dbUrlService.getMessagesPath(), msg).subscribe((data) => {
      console.log('data, ', data);
    });
  }
}
