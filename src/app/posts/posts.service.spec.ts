import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import { Post } from './post.model';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

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

describe('PostsService', () => {
  let service: PostsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getPosts and return an array of books', () => {
    service.getPosts().subscribe((res) => {
      expect(res).toEqual(mockPosts);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/posts`,
    });

    req.flush(mockPosts);
  });
});
