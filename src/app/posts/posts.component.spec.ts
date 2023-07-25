import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
];

describe('PostsComponent', () => {
  let component: PostsComponent;
  let service: PostsService;
  let fixture: ComponentFixture<PostsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all posts', () => {
    component.posts$ = of(mockPosts);
    fixture.detectChanges();
    const el = fixture.debugElement.queryAll(By.css('app-post'));

    expect(el.length).toBe(2);
  });

  it('should have proper input for post', () => {
    component.posts$ = of(mockPosts);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('app-post'));

    expect(el.properties['post']).toBe(mockPosts[0]);
  });

  it('should call delete method from output', () => {
    spyOn(service, 'deletePost').and.returnValue(of({}));

    component.posts$ = of(mockPosts);
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('app-post'));
    el.triggerEventHandler('delete', mockPosts[0].id);

    expect(service.deletePost).toHaveBeenCalledOnceWith(mockPosts[0].id);
  });
});
