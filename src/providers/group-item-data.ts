import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the GroupItem provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GroupItemData {

  public groupItemsRef: firebase.database.Reference;

  constructor() {
     this.groupItemsRef = firebase.database().ref('/group-item');
  }

  getGroupItems(groupId){
    return this.groupItemsRef.child(groupId);
  }

}
