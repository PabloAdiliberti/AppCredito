import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


import { MenuCreditoPage } from '../pages/menu-credito/menu-credito';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';



export const firebaseConfig = {
  apiKey: "AIzaSyDCv0vImz6mV8GHALqm-zAKem5n5w0uq9w",
  authDomain: "appcredito-9672a.firebaseapp.com",
  databaseURL: "https://appcredito-9672a.firebaseio.com",
  projectId: "appcredito-9672a",
  storageBucket: "",
  messagingSenderId: "870404759120"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisterPage,
    LoginPage,
    TabsPage,
   // BarcodeScanner,
  //  Camera,
    MenuCreditoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegisterPage,
    LoginPage,
    TabsPage,
    //BarcodeScanner,
   // Camera,
    MenuCreditoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
