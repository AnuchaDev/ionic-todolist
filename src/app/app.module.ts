import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDExizW9I2H0sA49CNTaPNht5cwOZiFwRE",
  authDomain: "todolist-61bc9.firebaseapp.com",
  projectId: "todolist-61bc9",
  storageBucket: "todolist-61bc9.appspot.com",
  messagingSenderId: "692122633480",
  appId: "1:692122633480:web:0c41d728f311aa3195d8bd",
  measurementId: "G-R2XEWHVY3Z"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     AngularFireStorageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
