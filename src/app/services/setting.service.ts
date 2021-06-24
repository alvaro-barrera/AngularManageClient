import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@Angular/fire/firestore';
import { Observable } from "rxjs";
import { Setting } from "../models/setting.model";

@Injectable()
export class SettingService{
  settingDoc: AngularFirestoreDocument<Setting>;
  setting: Observable<Setting | undefined>;

  id="1";

  constructor(
    private db:AngularFirestore
  ){}

  getsetting():Observable<Setting | undefined>{
    this.settingDoc = this.db.doc<Setting>(`settings/${this.id}`);
    this.setting = this.settingDoc.valueChanges();
    return this.setting;
  }

  updateSetting(setting: Setting){
    this.settingDoc = this.db.doc<Setting>(`settings/${this.id}`);
    this.settingDoc.update(setting);
  }
}
