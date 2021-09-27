import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { SignUpComponent } from './signup/signup.component'
import { MaterialModule } from '../app.material.module'
import { FormsModule } from '@angular/forms'
import { AuthRoutingModule } from './auth-routing.module'
@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, MaterialModule, FormsModule, AuthRoutingModule]
})
export class AuthModule {}
