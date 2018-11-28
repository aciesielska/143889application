import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './component/welcome-page/welcome-page.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {FooterComponent} from './component/footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import { AddDeviceComponent } from './component/add-device/add-device.component';

const appRoutes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: WelcomePageComponent}
];

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDtWfFD4S4Cok1D1_PGCyo_1mpsenh3K9M',
  authDomain: 'bookamobile-1b2bf.firebaseapp.com',
  databaseURL: 'https://bookamobile-1b2bf.firebaseio.com',
  projectId: 'bookamobile-1b2bf',
  storageBucket: 'bookamobile-1b2bf.appspot.com',
  messagingSenderId: '560126430955'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    AddDeviceComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(config, firebaseAuthConfig),
   // AngularFireDatabaseModule,
  ],
  providers: [
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
