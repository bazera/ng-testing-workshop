import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { User } from '../user.model';

class MockUserService {
  getUser = (): Observable<User> =>
    of({
      name: 'Test Name',
      lastname: 'Test Lastname',
      age: 27,
    });
}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserServiceSpy: UserService;

  beforeEach(() => {
    mockUserServiceSpy = jasmine.createSpyObj<UserService>('UserService', {
      getUser: of({
        name: 'Test Name',
        lastname: 'Test Lastname',
        age: 27,
      }),
    });

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: UserService, useValue: mockUserServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create a component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should put user name into the variable', () => {
    expect(component.userName).toBe('Test Name');
  });

  it('should call getUser upon init', () => {
    expect(mockUserServiceSpy.getUser).toHaveBeenCalled();
  });

  it('should call getUser only ones', () => {
    expect(mockUserServiceSpy.getUser).toHaveBeenCalledTimes(1);
  });
});
