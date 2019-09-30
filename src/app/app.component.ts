import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, Observable } from 'rxjs';
import { delay, share } from 'rxjs/operators';

export class User {
  firstName: string;
  lastName: string;
  age: number;
  height: number;
  mass: number;
  homeworld: string;
}

@Component({
  selector: 'app-root',
  template: `
    <h1>With ngIf and ngElse</h1>
    <div *ngIf="user | async as user; else loading">
      <h2>{{ user.firstName }} {{ user.lastName }}</h2>
      <dl>
        <dt>Age:</dt>
        <dd>{{ user.age }}</dd>

        <dt>Height:</dt>
        <dd>{{ user.height }}</dd>

        <dt>Mass:</dt>
        <dd>{{ user.mass }}</dd>

        <dt>Homeworld:</dt>
        <dd>{{ user.homeworld }}</dd>
      </dl>
    </div>
    <ng-template #loading>Loading User Data...</ng-template>

    <h2>Async Pipe with share() operator</h2>
    <div>
      <h2>{{ (user2 | async)?.firstName }} {{ (user2 | async)?.lastName }}</h2>
      <dl>
        <dt>Age:</dt>
        <dd>{{ (user2 | async)?.age }}</dd>

        <dt>Height:</dt>
        <dd>{{ (user2 | async)?.height }}</dd>

        <dt>Mass:</dt>
        <dd>{{ (user2 | async)?.mass }}</dd>

        <dt>Homeworld:</dt>
        <dd>{{ (user2 | async)?.homeworld }}</dd>
      </dl>
    </div>

    <h2>Manual subscription Handling in TypEscript</h2>
    <div>
      <h2>{{ user3?.firstName }} {{ user3?.lastName }}</h2>
      <dl>
        <dt>Age:</dt>
        <dd>{{ user3?.age }}</dd>

        <dt>Height:</dt>
        <dd>{{ user3?.height }}</dd>

        <dt>Mass:</dt>
        <dd>{{ user3?.mass }}</dd>

        <dt>Homeworld:</dt>
        <dd>{{ user3?.homeworld }}</dd>
      </dl>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  user: Observable<User>;
  user2;
  user3: User;
  subscription: Subscription;
  ngOnInit() {
    // Using ngIf ngElse
    this.user = this.getAsyncData();

    // Using just async pipe
    this.user2 = this.getAsyncData().pipe(share());

    // Manual subscription handling
    this.subscription = this.getAsyncData().subscribe(u => (this.user3 = u));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAsyncData() {
    // Fake Slow Async Data
    return of({
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 65,
      height: 172,
      mass: 77,
      homeworld: 'Tatooine'
    }).pipe(delay(5000));
  }
}
