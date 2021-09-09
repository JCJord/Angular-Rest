import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { SignUpComponent } from './auth/signup/signup.component'
import { PostList } from './post-list/post-list.component'
import { PostCreateComponent } from './posts/post-create/post-create.component'

const routes: Routes = [
  {
    path: '',
    component: PostList
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
