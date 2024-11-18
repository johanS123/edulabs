import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_URL_POST = `posts`;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = `${environment.apiUrl}`;

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
