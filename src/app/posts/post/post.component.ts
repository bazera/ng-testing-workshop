import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post?: Post;
  @Output() delete = new EventEmitter();

  constructor() {}

  deletePost(id: number) {
    this.delete.emit(id);
  }
}
