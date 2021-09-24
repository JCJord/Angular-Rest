import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ErrorComponent } from './error/error.component'
import { MatDialog } from '@angular/material/dialog'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor (public dialog: MatDialog) {}

  intercept (req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessages = 'An unknown error occurred'
        if (error.error.message) {
          errorMessages = error.error.message
        }
        this.dialog.open(ErrorComponent, { data: { message: errorMessages } })
        return throwError(error)
      })
    )
  }
}
