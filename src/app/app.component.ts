import { Component } from '@angular/core'
import { interval, Observable, Observer, Subscription } from 'rxjs'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  duration = 200
  numTimes = 10
  title = 'ng-async'

  executeFirstExample(): void {
    let sub: Subscription

    // stream of events / changes / pieces of data
    const observable: Observable<number> = interval(this.duration).pipe(take(this.numTimes))

    // consumer of stream
    const observer: Observer<number> = {
      complete: () => {
        // when complete() is invoked, sub is not closed
        console.log('Complete!', `sub.closed = ${sub.closed}`)

        // no need to unsubscribe()
        // try {
        //   console.log('Attempting unsubscribe() from complete()...')
        //   sub.unsubscribe()
        // } catch (err) {
        //   console.log(`Unable to invoke unsubscribe(), err=${err}`)
        // }
      },
      error: (err) => {
        console.error(err)
      },
      next: (val) => {
        console.log(val)
      },
    }

    // begin consumer listening
    sub = observable.subscribe(observer)

    // when function is invoked, sub is closed
    setTimeout(() => {
      console.log('Timeout!', `sub.closed = ${sub.closed}`)
    }, this.duration * (this.numTimes + 1))
  }
}
