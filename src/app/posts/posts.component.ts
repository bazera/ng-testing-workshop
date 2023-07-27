import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts$ = this.postsService.getPosts();

  constructor(private postsService: PostsService) {}

  deletePost(id: number) {
    this.postsService
      .deletePost(id)
      .subscribe(() => (this.posts$ = this.postsService.getPosts()));
  }

  delete(a: any) {}

  ngOnInit() {}
}
