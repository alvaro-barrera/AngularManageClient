import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string | null;
  registerPermission: boolean | undefined;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth()
    .subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false;
      }
    });

    this.settingService.getsetting()
    .subscribe(setting =>{
      if (setting != undefined) {
        this.registerPermission = setting.registerPermission;
      }
    })
  }
  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }

}
