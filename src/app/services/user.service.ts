import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment';

const API_URL_USERS = `users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/${API_URL_USERS}`);
  }

  updateUsers(id: number, body: IUser) {
    return this.http.put(`${this.apiUrl}/${API_URL_USERS}/${id}`, body);
  }

  deleteUSers(id: number) {
    return this.http.delete(`${this.apiUrl}/${API_URL_USERS}/${id}`);
  }
}
