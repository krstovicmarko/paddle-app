import { HttpInterceptorFn } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authenticationService = inject(AuthenticationService); // Inject the service directly
    const currentUser = authenticationService.currentUserValue;
    const isLoggedIn = authenticationService.loggedIn;
  // Get the auth token from your authentication service or local storage
    if(isLoggedIn && currentUser!=null){
        // Clone the request and add the authorization header
        const authReq = req.clone({
            setHeaders: {
            Authorization: `Bearer ${currentUser.jwtToken}`
            }
        });
        
        // Pass the cloned request to the next handler
        return next(authReq);
    }else{
        return next(req);
    }
};