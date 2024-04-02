import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelMenuComponent } from './panel-menu/panel-menu.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FieldsetModule } from 'primeng/fieldset';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutListComponent,
    AppMenuComponent,
    PanelMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    MenuModule,
    MegaMenuModule,
    PanelMenuModule,
    FloatLabelModule,
    InputTextModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
    FieldsetModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
