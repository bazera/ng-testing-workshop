import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user/user.component';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, RouterLink, provideRouter } from '@angular/router';

@Component({ selector: 'app-user', template: '' })
class MockUserComponent {}

@Component({ selector: 'app-about-us', template: '' })
class AboutUsMockComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerElements: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockUserComponent],
      providers: [
        provideRouter([{ path: 'about-us', component: AboutUsMockComponent }]),
      ],
      schemas: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    routerElements = fixture.debugElement.queryAll(By.directive(RouterLink));
  });

  it('should create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 router links', () => {
    expect(routerElements.length).toBe(4);
  });

  it('should navigate to about-us', fakeAsync(() => {
    const aboutUs = routerElements[2];

    aboutUs.triggerEventHandler('click', { button: 0 });

    tick();

    expect(TestBed.inject(Router).url).toBe('/about-us');
  }));

  it('should have correct routerLinks', () => {
    const routerLinks = routerElements.map((el) => el.injector.get(RouterLink));
    expect(routerLinks[0].href).toBe('/home');
    expect(routerLinks[1].href).toBe('/posts');
    expect(routerLinks[2].href).toBe('/about-us');
    expect(routerLinks[3].href).toBe('/contact');
  });
});
