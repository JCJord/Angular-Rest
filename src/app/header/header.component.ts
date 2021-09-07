import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  status = false
  constructor (public router: Router) {}
  toggleMenu () {
    this.status = !this.status
  }
}
