import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  getAuth(){
    return this.authService.authState.pipe(map(auth => auth));
  }

  logout(){
    this.authService.signOut();
  }

  register(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email,password)
      .then(data => resolve(data),
      error => reject(error))
    });
  }
}
