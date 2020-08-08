import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from '@independer/ng-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { MenusComponent } from './pages/menus/menus.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantesComponent,
    MenusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
