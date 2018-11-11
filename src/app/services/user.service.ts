import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from 'angularfire2';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class UserService {
  user: string;
  userId: any;
  userChange: Subject<string> = new Subject<string>();
  userIdChange: Subject<string> = new Subject<string>();
  reply: Subject<Error> = new Subject<Error>();

  constructor(public af: AngularFire) {
    this.af.auth.subscribe(auth => {
      console.log(auth);
      if (auth) {
        this.user = auth.auth.email;
        this.userId = auth.auth.uid;
        this.userChange.next(this.user);
        this.userIdChange.next(this.userId);
        localStorage.setItem('user', auth.auth.uid);
      } else {
        this.userChange.next(null);
        this.user = undefined;
      }
      console.log(this.user);
    });
  }

  login(user) {
    console.log('logging in', user.email, user.password);
    this.af.auth.login({
      email: user.email,
      password: user.password
    }).catch(e => {
      console.log(e);
      this.reply.next(e);
    });
  }

  register(user) {
    console.log('registering', user.email, user.password);
    this.af.auth.createUser({
      email: user.email,
      password: user.password
    }).catch(e => {
      console.log(e);
      this.reply.next(e);
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.af.auth.logout();
  }
}
