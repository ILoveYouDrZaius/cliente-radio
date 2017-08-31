import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio.component';
import { RouterModule } from '@angular/router';
import { routes } from './radio.routes';
import { NominatedsongsComponent } from '../../pages/radio/nominatedsongs/nominatedsongs.component';
import { PlayingsongComponent } from '../../pages/radio/playingsong/playingsong.component';
import { ChatComponent } from '../../pages/radio/chat/chat.component';
import { MessageComponent } from '../../pages/radio/chat/message/message.component';
import { AudioplayerComponent } from '../../pages/radio/audioplayer/audioplayer.component';
import { NavbarModule } from '../../shared_components/navbar/navbar.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FavouritesmodalComponent } from './favouritesmodal/favouritesmodal.component';
import { ProfilemodalComponent } from './profilemodal/profilemodal.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    RadioComponent,
    NominatedsongsComponent,
    PlayingsongComponent,
    MessageComponent,
    ChatComponent,
    AudioplayerComponent,
    FavouritesmodalComponent,
    ProfilemodalComponent,
  ]
})
export class RadioModule { }
