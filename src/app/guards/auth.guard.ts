import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.getAuthToken()) {
    return router.parseUrl('/login');
  }

  return true;
};
