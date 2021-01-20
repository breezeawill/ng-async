import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let mockSetTimeout: jasmine.Spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
    })
      .compileComponents()

    mockSetTimeout = spyOn(window, 'setTimeout').and.callFake(jasmine.createSpy() as any)

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
  })

  it('creates Component', () => {
    expect(component).toBeTruthy()
  })

  /**
   * Below is a good start on testing, but several problems exist -
   *     1. handleTimeout(), handleComplete(), and handleNext() are never invoked
   *     2. we are not accounting for asynchronous behavior (the setTimeout call)
   */
  // top level describe() is for grouping test blocks by public members (for easy access)
  describe('executeFirstExample()', () => {
    // inform in test output what action is about to take place
    describe('when invoked', () => {
      // actually execute whatever action
      beforeEach(() => {
        component.executeFirstExample()
      })

      // describe which assertions are about to be made (expectations as a result of the action that took place)
      it('sets sub and invokes setTimeout()', () => {
        expect(component.sub).toBeTruthy()
        expect(mockSetTimeout).toHaveBeenCalledTimes(1)
      })
    })
  })
})
