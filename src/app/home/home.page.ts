import { AngularFireDatabase } from '@angular/fire/database';
import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentDate: string;
  myTask: String;
  addTask: boolean;
  tasks = [];

  constructor(
    public afDB: AngularFireDatabase,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private router: Router,
  ) {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    this.currentDate = date.toLocaleDateString('en-US', options);
    this.getTasks();
  }

  addTaskToFirebase() {
    console.log(new Date());
    this.afDB.list('Tasks/').push({
      text: this.myTask,
      date: new Date().toISOString(),
      checked: false,
    });
    this.showForm();
  }

  showForm() {
    this.addTask = !this.addTask;
    this.myTask = '';
  }

  getTasks() {
    this.afDB
      .list('Tasks/')
      .snapshotChanges(['child_added', 'child_removed'])
      .subscribe((actions) => {
        this.tasks = [];
        actions.forEach((action) => {
          console.log('Tasks: ' + action.payload.exportVal().text);
          this.tasks.push({
            key: action.key,
            text: action.payload.exportVal().text,
            hour: action.payload.exportVal().date.substring(5, 10),
            checked: action.payload.exportVal().checked,
          });
        });
      });
  }
  changeCheckState(ev: any) {
    this.afDB.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

  deleteTask(task: any) {
    this.afDB.list('Tasks/').remove(task.key);
  }

  async updateTask(key) {
    console.log(key);
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'task',
          placeholder: 'New task',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Edit',
          handler: (data) => {
            if(data.task === ""){
              return false;
            }else{
              this.afDB.object('Tasks/' + key).update({ text: data.task });
              location.reload(true);
            }
          },
        },
      ],
    });
    (await alert).present();
  }
}
