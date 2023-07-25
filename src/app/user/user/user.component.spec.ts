import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { Observable, of } from 'rxjs';

class MockUserService {
  getUser = () =>
    of({
      name: 'Test Name',
      lastname: 'Test Lastname',
      age: 27,
    });
}

describe('UserComponent1', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService: UserService;

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj<UserService>('UserService', {
      getUser: of({
        name: 'Test Name',
        lastname: 'Test Lastname',
        age: 27,
      }),
    });

    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should fetch and display the user name 1', async () => {
    fixture.detectChanges(); // Trigger change detection

    expect(component.userName).toBe('Test Name');
    expect(mockUserService.getUser).toHaveBeenCalled();
  });
});

describe('UserComponent2', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let mockUserService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [{ provide: UserService, useClass: MockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    mockUserService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should fetch and display the user name 2', async () => {
    fixture.detectChanges(); // Trigger change detection

    expect(component.userName).toBe('Test Name');
  });
});
