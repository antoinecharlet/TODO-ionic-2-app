import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventListPage } from '../event-list/event-list';
import { ListPage } from '../list/list';
import { GroupData } from '../../providers/group-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public groupList: any;

  constructor(public navCtrl: NavController, public groupData: GroupData, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.init();
  }

  init() {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
      content: 'Chargement des données...'
    });
    // Show the popup
    loadingPopup.present();

    this.groupData.getGroupByUser().then(groupData => {
      this.groupList = groupData;
      //dismiss the popup
      loadingPopup.dismiss();
    });
  }

  addGroup() {
    let prompt = this.alertCtrl.create({
      title: "Créer un groupe d'utilisateurs.",
      message: "Entrez un nom pour le groupe.",
      inputs: [
        {
          name: 'name',
          placeholder: 'nom'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
          }
        },
        {
          text: 'Créer',
          handler: data => {
            if (data.name) {
              this.groupData.addGroup(data.name);
              this.init();
            }
            else { return false; }
          }
        }
      ]
    });
    prompt.present();
  }

  goToGroupDetail(groupId) { this.navCtrl.push(ListPage, { groupId: groupId }); }

  goToProfile() { this.navCtrl.push(ProfilePage); }

  goToList() { this.navCtrl.push(EventListPage); }

}
