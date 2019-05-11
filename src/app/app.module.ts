import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/Camera/ngx';

import { TagToServerController } from './http-controller/tagToServer';
import { PhotoToServerController} from './http-controller/photoToServer';
import { FolderToServerController } from './http-controller/folderToServer';
import { TagfolderToServerController } from './http-controller/tagfolderToServer';
import { SearchResultToServerController} from './http-controller/searchresultToServer';
import { GoogleVisionApiProvider } from './http-controller/google-vision-api';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    FilePath,
    SocialSharing,
    File,
    TagToServerController,
    PhotoToServerController,
    FolderToServerController,
    TagfolderToServerController,
    SearchResultToServerController,
    GoogleVisionApiProvider,
    NativeGeocoder,
  ],
    
  bootstrap: [AppComponent]
})
export class AppModule {}
