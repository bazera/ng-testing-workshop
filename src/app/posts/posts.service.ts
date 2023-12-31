import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Observable, filter, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`http://localhost:3000/posts`)
      .pipe(map((posts) => posts.map((p) => ({ ...p, id: p.id + 1 }))));
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:3000/posts/${id}`);
  }
}
