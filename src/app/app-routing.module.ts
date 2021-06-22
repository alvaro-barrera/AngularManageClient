import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  // {path: "", component: tablero},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "setting", component: SettingComponent},
  {path: "client/:id", component: ClientEditComponent},
  {path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
