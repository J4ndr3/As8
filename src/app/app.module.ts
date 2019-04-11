import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage'
import { DatabaseService } from './database.service';
import {HttpModule} from '@angular/http';
import { from } from 'rxjs';
 import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
 import {SQLite} from '@ionic-native/sqlite/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpModule,
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DatabaseService,
    SQLitePorter,
    SQLite
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
