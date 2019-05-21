import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// import { LoggingService } from './services/logging.service';
import { NotificationService } from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    // const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    // Server error
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        notifier.showError('No internet connection');
      } else {
        notifier.showError(
          `Server returned ${error.status} - ${error.message}`
        );
      }
    } else {
      // Client Error
      const message = error.message ? error.message : error.toString();
      notifier.showError(message);
    }
    console.error(error);
  }
}
