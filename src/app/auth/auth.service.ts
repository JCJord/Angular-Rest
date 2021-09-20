import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'

import { AuthData } from './auth.data'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false
  private authStatusListener = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer
  constructor (private http: HttpClient, private router: Router) {}

  createUser (email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http
      .post('http://localhost:3000/api/user', authData)
      .subscribe(res => {
        console.log(res)
      })
  }
  getToken () {
    return localStorage.getItem('token')
  }
  getIsAuth () {
    return this.isAuthenticated
  }
  getAuthStatusListener () {
    return this.authStatusListener.asObservable()
  }
  login (email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:3000/api/user/login',
        authData
      )
      .subscribe(response => {
        const token = response.token
        if (token) {
          const expiresInDuration = response.expiresIn
          console.log(expiresInDuration)
          this.tokenTimer = setTimeout(() => {
            this.logout()
          }, expiresInDuration * 100)
          this.isAuthenticated = true
          localStorage.setItem('token', token)

          this.authStatusListener.next(true)
          this.router.navigate(['/'])
        }
      })
  }
  logout () {
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.router.navigate(['/'])
    clearTimeout(this.tokenTimer)
  }
}
