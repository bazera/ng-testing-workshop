import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'login',
    ]);

    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and set isLoggedIn to true on successful login', fakeAsync(() => {
    authService.login.and.returnValue(Promise.resolve(true));

    component.onLogin('test', 'password');

    flush();

    expect(component.isLoggedIn).toBe(true);
    expect(authService.login).toHaveBeenCalledWith('test', 'password');
  }));

  it('should call login and set isLoggedIn to false on failed login', fakeAsync(() => {
    authService.login.and.returnValue(Promise.resolve(false));

    component.onLogin('test', 'wrongpassword');

    flush();

    expect(component.isLoggedIn).toBe(false);
    expect(authService.login).toHaveBeenCalledWith('test', 'wrongpassword');
  }));
});
