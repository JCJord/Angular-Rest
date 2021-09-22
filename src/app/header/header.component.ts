import { Component, Injectable, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable()
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false
  private authListenerSubs!: Subscription
  status = false
  constructor (public router: Router, private authService: AuthService) {}

  toggleMenu () {
    this.status = !this.status
  }

  onLogout () {
    this.authService.logout
    this.clearAuthDate()
  }

  public clearAuthDate () {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
  }
  ngOnInit () {
    this.userIsAuthenticated = this.authService.getIsAuth()

    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
  }
  ngOnDestroy () {}
}
