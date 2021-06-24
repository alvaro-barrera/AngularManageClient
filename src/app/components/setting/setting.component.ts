import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Setting } from 'src/app/models/setting.model';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  registerPermission: boolean | undefined = false;
  constructor(private router: Router, private settingService: SettingService) {}

  ngOnInit(): void {
    this.settingService
      .getsetting()
      .subscribe((setting: Setting | undefined) => {
        console.log(setting);

        if (setting != undefined) {
          this.registerPermission = setting.registerPermission;
        }
      });
  }
  save() {
    let setting = { registerPermission: this.registerPermission };
    this.settingService.updateSetting(setting);
    this.router.navigate(['/']);
  }
}
