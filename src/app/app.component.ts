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
  pageHeader = 'Subscription Demo'
  sub: Subscription

  executeFirstExample(): void {
    // stream of events / changes / pieces of data
    const observable: Observable<number> = interval(this.duration).pipe(take(this.numTimes))

    // consumer of stream
    const observer: Observer<number> = {
      // must bind() to get proper context for `this`
      complete: this.handleComplete.bind(this),
      error: this.handleError,
      next: this.handleNext,
    }

    // begin consumer listening
    this.sub = observable.subscribe(observer)

    // must bind() to get proper context for `this`
    setTimeout(this.handleTimeout.bind(this), this.duration * (this.numTimes + 1))
  }

  // when invoked, sub is not closed
  handleComplete(): void {
    console.log('Complete!', `sub.closed = ${this.sub.closed}`)

    // no need to unsubscribe()
    // try {
    //   console.log('Attempting unsubscribe() from complete()...')
    //   sub.unsubscribe()
    // } catch (err) {
    //   console.log(`Unable to invoke unsubscribe(), err=${err}`)
    // }
  }

  private handleError(err: any): void {
    console.error(err)
  }

  handleNext(val: any): void {
    console.log(val)
  }

  // when invoked, sub is closed
  handleTimeout(): void {
    console.log('Timeout!', `sub.closed = ${this.sub.closed}`)
  }
}
