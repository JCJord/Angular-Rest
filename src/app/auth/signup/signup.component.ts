import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',

  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css', './signup.component.css']
})
export class SignUpComponent {
  isLoading = false
  constructor (public router: Router) {}

  onSignup (form: NgForm) {
    console.log(form.value)
  }
}
