import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  NavigationEnd,
  Router,
  RouterLink,
  provideRouter,
} from '@angular/router';

@Component({ selector: 'app-user', template: '' })
class UserMockComponent {}

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletMockComponent {}

@Component({ selector: 'app-contact', template: '' })
class ContactMockComponent {}

describe('AppComponent1', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserMockComponent,
        RouterOutletMockComponent,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('AppComponent2', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerLinks: RouterLink[];
  let routerElements: DebugElement[];
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideRouter([{ path: 'contact', component: ContactMockComponent }]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();

    routerElements = fixture.debugElement.queryAll(By.directive(RouterLink));
    routerLinks = routerElements.map((el) => el.injector.get(RouterLink));
  });

  it('should display router links', () => {
    expect(routerLinks.length).withContext('should have 3 routerLinks').toBe(4);
    expect(routerLinks[0].href).toBe('/home');
    expect(routerLinks[1].href).toBe('/posts');
    expect(routerLinks[2].href).toBe('/about-us');
    expect(routerLinks[3].href).toBe('/contact');
  });

  it('can click on contact in template', fakeAsync(() => {
    const contactBtn = routerElements[3];

    contactBtn.triggerEventHandler('click', { button: 0 });
    tick();
    fixture.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/contact');
  }));
});
