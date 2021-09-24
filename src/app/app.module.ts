import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { MaterialModule } from './app.material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { PostCreateComponent } from './posts/post-create/post-create.component'
import { HeaderComponent } from './header/header.component'
import { PostList } from './post-list/post-list.component'
import { LoginComponent } from './auth/login/login.component'
import { SignUpComponent } from './auth/signup/signup.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './auth/auth-interceptor'
import { ErrorInterceptor } from './error-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostList,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
