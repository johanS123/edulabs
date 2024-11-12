import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL_POST = `posts`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = `http://localhost:8000/api`;

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.apiUrl}/${API_URL_POST}`);
  }

  createPosts(body: any) {
    return this.http.post(`${this.apiUrl}/${API_URL_POST}`, body);
  }

  editarPost(body: any, id: number) {
    return this.http.put(`${this.apiUrl}/${API_URL_POST}/${id}`, body);
  }

  getPostByCategory(categoryId: number) {
    return this.http.get(`${this.apiUrl}/${API_URL_POST}/${categoryId}`);
  }
}
