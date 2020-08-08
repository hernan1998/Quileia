import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { MenusComponent } from './pages/menus/menus.component';





const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Home/Restaurantes', component: RestaurantesComponent },
  { path: 'Home/Menus', component: MenusComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
