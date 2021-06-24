import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingComponent } from './components/setting/setting.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: BoardComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "setting", component: SettingComponent,canActivate: [AuthGuard]},
  {path: "client/:id", component: ClientEditComponent,canActivate: [AuthGuard]},
  {path: "**", component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
