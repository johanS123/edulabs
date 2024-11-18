import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL_CATEGORY = `categories`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/${API_URL_CATEGORY}`);
  }
}
