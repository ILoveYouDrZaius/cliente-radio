import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database/database.service';
import { DatabaseUrlService } from '../../../services/database-url/database-url.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MessagesService } from '../../../services/messages/messages.service';
import { UsersService } from '../../../services/users/users.service';
import { Message } from '../../../interfaces/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ MessagesService, UsersService ]
})
export class ChatComponent implements OnInit {
  private _loginStatus: boolean;
  public messages: FirebaseListObservable<any>;
  public connectedUsers: FirebaseListObservable<any>;

  constructor(private db: DatabaseService,
    private dbUrl: DatabaseUrlService,
    private messagesService: MessagesService,
    private usersService: UsersService) {

  }

  getList() {
    this.messages = this.messagesService.getList();
    this.connectedUsers = this.usersService.getUsersConnectedList();
  }

  removeMessageButton(messageKey: string) {
    this.messagesService.removeMessage(messageKey);
  }

  ngOnInit() {
    this.getList();
  }
}