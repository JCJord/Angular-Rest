import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthInterceptor } from './auth-interceptor'
import { AuthData } from './auth.data'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) {}

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
  login (email: string, password: string) {
    const authData: AuthData = { email: email, password: password }
    this.http
      .post<{ token: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token
        localStorage.setItem('token', token)

        console.log(token)
      })
  }
}
