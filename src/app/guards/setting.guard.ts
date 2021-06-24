import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SettingService } from "../services/setting.service";

@Injectable()
export class SettingGuard implements CanActivate{
  constructor(
    private router: Router,
    private settingService: SettingService
  ){}

  canActivate():Observable<boolean>{
    return this.settingService.getsetting().pipe(
      map(setting =>{
        if(setting?.registerPermission){
          return true;
        }else{
          this.router.navigate(["/login"]);
          return false;
        }
      })
    );
  }
}
