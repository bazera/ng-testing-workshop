import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post } from './post.model';
import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const mockPosts: Post[] = [
  {
    id: 1,
    name: 'Mock Post 1',
    content: 'Mock Post 1 Content',
  },
  {
    id: 2,
    name: 'Mock Post 2',
    content: 'Mock Post 2 Content',
  },
  {
    id: 3,
    name: 'Mock Post 3',
    content: 'Mock Post 3 Content',
  },
];

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PostsComponent],
      providers: [PostsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostsService);
    component.posts$ = of(mockPosts);
    fixture.detectChanges();
  });

  it('should create component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should display all returned posts', () => {
    const el = fixture.debugElement.queryAll(By.css('app-post'));

    expect(el.length).toBe(mockPosts.length);
  });

  it('should have proper input for post component', () => {
    const post = fixture.debugElement.query(By.css('app-post'));

    expect(post.properties['post']).toBe(mockPosts[0]);
  });

  it('should call deletePost method after emitting delete event ', () => {
    const post = fixture.debugElement.query(By.css('app-post'));
    const deletePostSpy = spyOn(component, 'deletePost');
    spyOn(service, 'deletePost').and.returnValue(of({}));
    post.triggerEventHandler('delete', mockPosts[0].id);
    expect(deletePostSpy).toHaveBeenCalledWith(mockPosts[0].id);
  });
});
