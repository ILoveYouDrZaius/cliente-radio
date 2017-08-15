import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { PlayingsongComponent } from './webcomponents/playingsong/playingsong.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayingsongComponent
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
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
