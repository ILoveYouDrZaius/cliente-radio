import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../../../services/database/database.service';
import { DatabaseUrlService } from '../../../services/database-url/database-url.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MessagesService } from '../../../services/messages/messages.service';
import { UsersService } from '../../../services/users/users.service';
import { Message } from '../../../interfaces/message';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ MessagesService, UsersService, AuthService ]
})
export class ChatComponent implements OnInit {
  private _loginStatus: boolean;
  private messages: FirebaseListObservable<any>;
  private connectedUsers: FirebaseListObservable<any>;
  private _stringToSend: string;
  private userKey: string;

  constructor(private auth: AuthService,
              private db: DatabaseService,
              private dbUrl: DatabaseUrlService,
              private messagesService: MessagesService,
              private usersService: UsersService) {
    this.getList();
    this.messages.subscribe((cambio) => {
      var element = document.getElementById("chatwindow");
      element.scrollTop = element.scrollHeight;
    });
  }

  getList() {
    this.messages = this.messagesService.getList();
    this.connectedUsers = this.usersService.getUsersConnectedList();
  }

  removeMessageButton(messageKey: string) {
    this.messagesService.removeMessage(messageKey);
  }

  ngOnInit() {
    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.userKey = this.auth.getCurrentUserId();
      }
    });
  }

  sendMessage(event) {
    event.preventDefault();
    this.messagesService.sendMessage(this.stringToSend, this.userKey);
  }

  get stringToSend(): string {
    return this._stringToSend;
  }

  set stringToSend(value: string) {
    this._stringToSend = value;
  }
}
