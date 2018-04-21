import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';

import { environment} from '../environments/environment'; 

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
 import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
 
 import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { DemandelistComponent } from './demandelist/demandelist.component'; 

export const firebaseConfig = {
  apiKey: "AIzaSyAbYjhl5cCMZotC0z5ckk1Ryzb_jhn7Hg4",
  authDomain: "robotserveur-615d6.firebaseapp.com",
  databaseURL: "https://robotserveur-615d6.firebaseio.com",
  projectId: "robotserveur-615d6",
  storageBucket: "robotserveur-615d6.appspot.com",
  messagingSenderId: "222722706892"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    DemandelistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
	CommonModule,
    FormsModule,
    FixedPluginModule,
	AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
