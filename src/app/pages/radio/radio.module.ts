import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { RouterModule } from '@angular/router';
import { routes } from './radio.routes';
import { NominatedsongsComponent } from '../../webcomponents/nominatedsongs/nominatedsongs.component';
import { PlayingsongComponent } from '../../webcomponents/playingsong/playingsong.component';
import { ChatComponent } from '../../webcomponents/chat/chat.component';
import { MessageComponent } from '../../webcomponents/chat/message/message.component';
import { AudioplayerComponent } from '../../webcomponents/audioplayer/audioplayer.component';
import { NavbarComponent } from '../../webcomponents/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RadioComponent,
    NominatedsongsComponent,
    PlayingsongComponent,
    MessageComponent,
    ChatComponent,
    AudioplayerComponent,
    NavbarComponent,
  ]
})
export class RadioModule { }
