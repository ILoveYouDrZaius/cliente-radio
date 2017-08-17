import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../../interfaces/message';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Output() eventClick: EventEmitter<any> = new EventEmitter();
  private username: string;

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.getUserName(this.message.user).subscribe((data) => {
      this.username = data;
    });
  }
}