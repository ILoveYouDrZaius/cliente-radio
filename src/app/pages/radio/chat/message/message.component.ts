import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../../interfaces/message';
import { UsersService } from '../../../../services/users/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Output() eventClick: EventEmitter<any> = new EventEmitter();
  private username: string;
  private msgTime: String;
  private msgDate: String;
  private messageAdministrator: String;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.getUserName(this.message.user).subscribe((data) => {
      this.username = data;
      if (data == "Administración") {
        this.messageAdministrator = "text-primary";
      }
    });
    const dateTimeMsg = new Date(+(this.message.timestamp));
    this.msgDate = (("0" + dateTimeMsg.getUTCDate()).slice(-2).toString()) + '/' + (("0" + (dateTimeMsg.getUTCMonth() + 1)).slice(-2)).toString() + '/' + ("0" + dateTimeMsg.getUTCFullYear()).slice(-2).toString();
    this.msgTime = (("0" + (dateTimeMsg.getUTCHours() - (dateTimeMsg.getTimezoneOffset() / 60))).slice(-2)).toString() + ':' + ("0" + (dateTimeMsg.getUTCMinutes())).slice(-2).toString() + ':' + ("0" + dateTimeMsg.getUTCSeconds()).slice(-2).toString();
    
  }
}