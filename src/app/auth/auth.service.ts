import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { HeaderComponent } from '../header/header.component'
import { AuthData } from './auth.data'
import { environment } from '../../environments/environment'

const BACKEND_URL = environment.apiUrl + '/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string
  private isAuthenticated = false
  private authStatusListener = new Subject<boolean>()
  private tokenTimer!: NodeJS.Timer
  private userId!: any

  constructor (private http: HttpClient, private router: Router) {}

  createUser (email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http.post(BACKEND_URL + '/signup', authData).subscribe(
      () => {
        this.router.navigate(['/login'])
      },
      error => {
        this.authStatusListener.next(false)
      }
    )
  }

  getToken () {
    return localStorage.getItem('token')
  }

  getIsAuth () {
    return this.isAuthenticated
  }

  getUserId () {
    return this.userId
  }

  getAuthStatusListener () {
    return this.authStatusListener.asObservable()
  }

  login (email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(
        response => {
          const token = response.token
          if (token) {
            const expiresInDuration = response.expiresIn
            console.log('Duração' + expiresInDuration)
            this.setAuthTimer(expiresInDuration)
            this.isAuthenticated = true
            this.userId = response.userId
            this.authStatusListener.next(true)
            const now = new Date()
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            )
            console.log(expirationDate)
            this.saveAuthData(token, expirationDate, this.userId)
            this.router.navigate(['/'])
          }
        },
        error => {
          this.authStatusListener.next(false)
        }
      )
  }

  autoAuthUser () {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation!.expirationDate.getTime() - now.getTime()

    if (expiresIn > 0) {
      this.token = authInformation!.token
      this.isAuthenticated = true
      this.userId = authInformation.userId
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
    }
  }

  private setAuthTimer (duration: number) {
    console.log('setting timer : ' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration)
  }
  logout () {
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.userId = null
  }
  private saveAuthData (token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userId', userId)
  }

  private getAuthData () {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    const userId = localStorage.getItem('userId')
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
