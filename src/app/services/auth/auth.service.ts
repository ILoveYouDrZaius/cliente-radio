import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../interfaces/user';
import * as firebase from 'firebase/app';
import { DatabaseService } from '../database/database.service';
import { DatabaseUrlService } from '../database-url/database-url.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private _userData: User;
  private _userState: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private dataService: DatabaseService, private dataUrl: DatabaseUrlService) {
    this.userState = this.afAuth.authState;
  }

  isAuthenticated(): boolean {
    // this.auth.getCurrentAuthState().subscribe(user => {
    //   if (user) {
    //     if (user.emailVerified) {
    //       console.log('Estás logueado y validado: ' + user.email);
    //       this.loginStatus = true;
    //     } else {
    //       console.log('Estás logueado pero no puedes continuar hasta que verifiques tu email.')
    //       this.loginStatus = false;
    //     }
    //   } else {
    //     console.log('No estás logueado');
    //     this.loginStatus = false;
    //   }
    // });
    return (this.getCurrentUser() && this.getCurrentUser().emailVerified) ? true : false;
  }

  getCurrentUserId(): string {
    return this.afAuth.auth.currentUser.uid;
  }

  getCurrentUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  getCurrentAuthState(): Observable<firebase.User> {
    return this.userState;
  }

  signupWithEmail(email: string, password: string, repassword: string) {
    if (password === repassword) {
      console.log('Coinciden las passwords');
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(data => {
          console.log('Registro correcto'); // TODO: sustituir por un sistema de log
          this.generateUserData(data);
          data.sendEmailVerification()
            .then(() => {
              console.log('Email de verificación enviado'); // TODO: sustituir por un sistema de log
            })
            .catch(err => {
              console.log(err); // TODO: sustituir por un sistema de log
            });
        })
        .catch(err => {
          console.log(err); // TODO: sustituir por un sistema de log
        });
    } else {
      // TODO: Controlar error
      console.log('Las contraseñas no coinciden');
    }
  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log('Login correcto');
        console.log(data); // TODO: sustituir por un sistema de log
      })
      .catch(err => {
        console.log(err); // TODO: sustituir por un sistema de log
      });
  }

  logout() {
    console.log('LOGOUT PULSADO');
    this.afAuth.auth.signOut()
      .then(data => {
        console.log('Logout correcto');
        console.log(data); // TODO: sustituir por un sistema de log
      })
      .catch(err => {
        console.log(err); // TODO: sustituir por un sistema de log
      });
  }

  loginWithGooglePlus() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()
      .addScope('https://www.googleapis.com/auth/plus.login'))
      .then(data => {
        console.log('Logout correcto');
        console.log(data);
        // TODO: vocar a Firebase los datos del usuario
        // user.name = data.user.displayName;
        // user.email = data.user.email;
        // user.avatar = data.user.photoURL;
        // user.login_type = data.credential.providerId;
        this.generateUserData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginWithFacebook() {
    firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()
      .addScope('public_profile'))
      .then(data => {
        console.log(data);
        // TODO: vocar a Firebase los datos del usuario
        this.generateUserData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  loginWithTwitter() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(data => {
        console.log(data);
        // TODO: vocar a Firebase los datos del usuario
        this.generateUserData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  generateUserData(data: any) {
    const user: User = {};
    let userId = '';
    if (data.user) {
      userId = data.user.uid;
      user.name = data.user.name;
      user.email = data.user.email;
      user.login_type = data.credential.providerId;
      // user.avatar = data.user.photoURL;
    } else {
      userId = data.uid;
      user.email = data.email;
      user.login_type = data.providerData[0].providerId;
      //user.phone = string, TODO
      //user.role = number TODO
      //user.birth_date = number, TODO
    }

    this.dataService.createWithKey(this.dataUrl.getUsersPath(), userId, user)
      .then(value => {
        console.log(value);
      })
      .catch(err => {
        console.log(err);
      });
  }

  get userData(): User {
    return this._userData;
  }

  set userData(value: User) {
    this._userData = value;
  }

  get userState(): Observable<firebase.User> {
    return this._userState;
  }

  set userState(value: Observable<firebase.User>) {
    this._userState = value;
  }
}