import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL_CATEGORY = `categories`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `http://localhost:8000/api`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/${API_URL_CATEGORY}`);
  }
}
