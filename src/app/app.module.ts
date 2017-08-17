import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { PlayingsongComponent } from './webcomponents/playingsong/playingsong.component';
import { HttpClientModule } from '@angular/common/http';
import { NominatedsongsComponent } from './webcomponents/nominatedsongs/nominatedsongs.component';
import { ChatComponent } from './webcomponents/chat/chat.component';
import { MessageComponent } from './webcomponents/chat/message/message.component';
import { AudioplayerComponent } from './webcomponents/audioplayer/audioplayer.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayingsongComponent,
    NominatedsongsComponent,
    ChatComponent,
    MessageComponent,
    AudioplayerComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAasuPpwOGW5rpIAB69Ng0YtcKYEXkQVFY',
      authDomain: 'radiointeractiva-9a96d.firebaseapp.com',
      databaseURL: 'https://radiointeractiva-9a96d.firebaseio.com',
      projectId: 'radiointeractiva-9a96d',
      storageBucket: 'radiointeractiva-9a96d.appspot.com',
      messagingSenderId: '946787529311'
    }),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
