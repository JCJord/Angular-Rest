import { Component, Input } from '@angular/core'
import {Post} from '../posts/post.model'
@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostList {
  panelOpenState = false

  // posts = [
  //   {
  //     title: 'First Post',
  //     content: 'This is the post content 1st'
  //   },
  //   {
  //     title: 'Second Post',
  //     content: 'This is the post content 2nd '
  //   },
  //   {
  //     title: 'Third Post',
  //     content: 'This is the post content 3rd'
  //   }
  // ]

  @Input() posts:Post[] = []
}
