import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) {}

  createUser (email: string, password: string) {
    this.http.post('http://localhost:3000/api/user/', {})
  }
}
