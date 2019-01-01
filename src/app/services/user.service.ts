import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, AngularFireDatabase} from 'angularfire2';
import {Subject, Observable} from 'rxjs';

@Injectable()
export class UserService {
  user: string;
  userId: any;
  userChange: Subject<string> = new Subject<string>();
  userIdChange: Subject<string> = new Subject<string>();
  role: Subject<any> = new Subject<any>();
  reply: Subject<Error> = new Subject<Error>();

  constructor(public af: AngularFire,
              public db: AngularFireDatabase) {
    this.af.auth.subscribe(auth => {
      console.log(auth);
      if (auth) {
        this.user = auth.auth.email;
        this.userId = auth.auth.uid;
        this.userChange.next(this.user);
        this.userIdChange.next(this.userId);
        localStorage.setItem('user', auth.auth.uid);
        this.db.list(`/users/${this.userId}`).subscribe(u => {
          this.role.next(u[1].$value);
        });
      } else {
        this.userChange.next(null);
        this.user = undefined;
      }
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
    }).then((a) => {
      this.db.list('/users/').update(a.auth.uid, { email: a.auth.email, role: 'user', uid: a.auth.uid});
    }).catch(e => {
      console.log(e);
      this.reply.next(e);
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.role.next(null);
    this.af.auth.logout();
  }
}
