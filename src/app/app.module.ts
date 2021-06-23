import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule, } from "@Angular/fire/firestore";
// FirestoreSettingsToken
import {AngularFireAuthModule} from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SettingComponent } from './components/setting/setting.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardComponent } from './components/board/board.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ClientService } from './services/client.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    SettingComponent,
    ClientEditComponent,
    LoginComponent,
    NotFoundComponent,
    FooterComponent,
    RegisterComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, "ManageClientApp"),
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
