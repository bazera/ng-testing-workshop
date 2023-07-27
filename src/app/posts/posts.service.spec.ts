import { TestBed } from '@angular/core/testing';
import { PostsService } from './posts.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Post } from './post.model';

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

describe('PostsService', () => {
  let service: PostsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    service = TestBed.inject(PostsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create service instance', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPosts only once and return an array of posts', () => {
    service.getPosts().subscribe((res) => {
      const mappedMockPosts = mockPosts.map((p) => ({ ...p, id: p.id + 1 }));
      expect(res).toEqual(mappedMockPosts);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: 'http://localhost:3000/posts',
    });

    req.flush(mockPosts);
  });
});
