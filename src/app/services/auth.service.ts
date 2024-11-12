import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuth } from '../interfaces/auth';
import { IUser } from '../interfaces/user';

const API_URL = `http://localhost:8000/api`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = { id: 1, name: 'Juan Pérez' };
  constructor(
    private http: HttpClient,
    public router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  // Método para decodificar el JWT
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  login(body: IAuth) {
    return this.http.post(`${API_URL}/login`, body);
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

  getLoggedInUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null; // O maneja el caso donde no hay un token disponible
    }
    const decodedToken = this.decodeToken(token);
    const user = decodedToken?.sub;
    return user;
  }

  register(body: IUser) {
    return this.http.post(`${API_URL}/register`, body);
  }
}
