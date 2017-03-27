import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the GroupData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GroupData {

  public groupsRef: firebase.database.Reference;
  public userProfileRef: firebase.database.Reference;

  constructor() {
    this.userProfileRef = firebase.database().ref('/userProfile');
    this.groupsRef = firebase.database().ref('/groups');
  }

  getGroupByUser() {
    return this.getUserProfile().child('/groups').once('value')
      .then(function (userGroupsSnapshot) {
        var groupPromises = [];
        var groups = firebase.database().ref('/groups');
        userGroupsSnapshot.forEach(function (userGroupSnapshot) {
          var groupData = {};
          groupPromises.push(
            groups.child(userGroupSnapshot.key).once("value")
              .then(function (groupSnap) {
                groupData = groupSnap.val();
                if (groupData) {
                  return groupData;
                } else {
                  groupData = null;
                  return null;
                }
              }));
        });
        return groupPromises;
      })
      .then(function (groupDataPromises) {
        return Promise.all(groupDataPromises);
      });
  };

  addGroup(groupName) {
    if (!groupName || !firebase.auth().currentUser) return;

    var addedGroup = this.groupsRef.push();

    if (!addedGroup) return;

    var form = {
      id: addedGroup.key,
      owner: firebase.auth().currentUser.uid,
      name: groupName,
      created: firebase.database.ServerValue.TIMESTAMP,
      updated: firebase.database.ServerValue.TIMESTAMP,
      members: {}
    };

    form.members[firebase.auth().currentUser.uid] = true;

    //set group value
    addedGroup.set(form,  (err) => {
      if (err) {
        console.error(err);
      } else {
        //add group to user
        this.getUserProfile().child('groups').child(addedGroup.key).set(true);
      }
    });

  };


  getGroupRef(): firebase.database.Reference {
    return this.groupsRef;
  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfileRef.child(firebase.auth().currentUser.uid);
  }



}
