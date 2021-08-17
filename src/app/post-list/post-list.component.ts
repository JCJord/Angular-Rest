import { Component,  OnDestroy,  OnInit } from '@angular/core'
import {Subscription} from 'rxjs'
import {Post} from '../posts/post.model'
import { PostsService } from '../posts/posts.services'
@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostList implements OnInit, OnDestroy{
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

  posts:Post[] = []
  private postsSub!: Subscription

  constructor(public postsService:PostsService){

  }

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts:Post[])=>{
      this.posts = posts
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
