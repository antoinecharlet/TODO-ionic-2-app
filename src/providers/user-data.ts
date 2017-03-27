import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {

  userRef : firebase.database.Reference;
  userProfileRef : firebase.database.Reference;

  constructor() {
    this.userRef = firebase.database().ref('/users');
    this.userProfileRef = firebase.database().ref('/userProfile');
  }

  userProfile(){
    return this.userProfileRef.child(firebase.auth().currentUser.uid);
  }

}
