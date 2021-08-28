import { Component, Injectable, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Post } from '../post.model'
import { PostsService } from '../posts.services'
import { mimeType } from './mime-type.validator'
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  private mode = 'create'
  private postId
  post
  isLoading = false
  imagePreview
  form!: FormGroup
  constructor (
    public postsService: PostsService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  onImagePick (event: Event) {
    const file = (event.target as HTMLInputElement | any).files[0]

    this.form.patchValue({ image: file })
    this.form.get('image')?.updateValueAndValidity()
    console.log(file)
    console.log(this.form)
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onAddPost () {
    if (this.form.invalid) {
      return
    }

    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      )
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      )
      this.router.navigate(['/'])

      setTimeout(() => {
        window.location.reload()
      }, 1)
    }
  }
  ngOnInit () {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true
        this.mode = 'edit'
        this.postId = paramMap.get('postId')
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath
          }
          this.isLoading = false
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.imagePath
          })
        })
      } else {
        this.mode = 'create'
        this.postId = null
      }
    })
  }
}
