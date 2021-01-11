import { Component } from '@angular/core'
import { interval, Observable, Observer } from 'rxjs'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ng-async'

  executeFirstExample(): void {
    // stream of events / changes / pieces of data
    const observable: Observable<number> = interval(1000).pipe(take(10))

    // consumer of stream
    const observer: Observer<number> = {
      complete: () => {
        console.log('Complete!')
      },
      error: (err) => {
        console.error(err)
      },
      next: (val) => {
        console.log(val)
      },
    }

    // begin consumer listening
    observable.subscribe(observer)
  }
}
