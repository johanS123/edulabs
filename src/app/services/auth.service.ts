import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

interface BodyLogin {
  user: string;
  password: string;
}

const API_URL = `https://localhost:7071/api`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    public router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  login(body: BodyLogin) {
    return this.http.post(`${API_URL}/Login`, body);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['auth']);
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (
      this.jwtHelper.isTokenExpired(token as any) ||
      !localStorage.getItem('token')
    ) {
      return false;
    }
    return true;
  }
}
