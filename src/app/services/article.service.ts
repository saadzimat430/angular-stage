import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../common/article';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'http://localhost:8080/api/articles';

  constructor(private httpClient: HttpClient) { }

  headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('auth-token')
  });

  getArticlesList(): Observable<GetResponseArticles> {
    return this.httpClient.get<GetResponseArticles>(this.baseUrl);
  }

  createArticle(data): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, data, {headers: this.headers});
  }

  updateArticle(id: number, value: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, value, {headers: this.headers});
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: 'text', headers: this.headers });
  }

}

interface GetResponseArticles {
  _embedded: {
    articles: Article[];
  };
}
