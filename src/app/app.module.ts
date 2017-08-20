import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './pages/login/login.component';
// import { NominatedsongsComponent } from './webcomponents/nominatedsongs/nominatedsongs.component';
// import { PlayingsongComponent } from './webcomponents/playingsong/playingsong.component';
// import { ChatComponent } from './webcomponents/chat/chat.component';
// import { MessageComponent } from './webcomponents/chat/message/message.component';
// import { AudioplayerComponent } from './webcomponents/audioplayer/audioplayer.component';
// import { NavbarComponent } from './webcomponents/navbar/navbar.component';
import { RadioModule } from './pages/radio/radio.module';
import { NavbarModule } from './shared_components/navbar/navbar.module';
import { NavbarLoginModule } from './shared_components/navbar-login/navbar-login.module';
import { LoginModule } from './pages/login/login.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
// import { NavbarLoginComponent } from './shared_components/navbar-login/navbar-login.component';

@NgModule({
  declarations: [
    AppComponent,
    // NavbarLoginComponent,
    // PlayingsongComponent,
    // NominatedsongsComponent,
    // ChatComponent,
    // MessageComponent,
    // AudioplayerComponent,
    // NavbarComponent,
    // LoginComponent
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
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    HttpClientModule,
    RadioModule,
    NavbarModule,
    NavbarLoginModule,
    LoginModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
