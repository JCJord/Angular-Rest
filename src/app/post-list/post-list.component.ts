import { Component, OnDestroy, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { Subscription } from 'rxjs'
import { Post } from '../posts/post.model'
import { PostsService } from '../posts/posts.services'

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostList implements OnInit, OnDestroy {
  panelOpenState = false
  isLoading = false

  posts: Post[] = []
  totalPosts = 0
  postsPerPage = 2
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10]
  private postsSub!: Subscription

  constructor (public postsService: PostsService) {}

  ngOnInit () {
    this.isLoading = true
    this.postsService.getPosts(this.postsPerPage, 1)
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false
        this.totalPosts = postData.postCount
        this.posts = postData.posts
      })
  }

  onChangedPage (pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  ngOnDestroy () {
    this.postsSub.unsubscribe()
  }

  onDelete (postId: string) {
    this.isLoading = true
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    })
  }
}
