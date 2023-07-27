import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let routerElements: DebugElement[];
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AuthComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
      schemas: [],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and set isLoggedIn to true on succesful login', fakeAsync(() => {
    authService.login.and.returnValue(of(true));

    component.onLogin('test', 'password');

    flush();

    expect(component.isLoggedIn).toBe(true);
    expect(authService.login).toHaveBeenCalledWith('test', 'password');
  }));

  it('should call login and set isLoggedIn to false on failed login', fakeAsync(() => {
    authService.login.and.returnValue(of(false));

    component.onLogin('test', 'password');

    flush();

    expect(component.isLoggedIn).toBe(false);
  }));
});
