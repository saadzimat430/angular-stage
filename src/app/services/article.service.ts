import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../common/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl = 'https://murmuring-beach-44839.herokuapp.com/api/articles';

  constructor(private httpClient: HttpClient) { }

  getArticlesList(): Observable<GetResponseArticles> {

    return this.httpClient.get<GetResponseArticles>(this.baseUrl);
  }

  createArticle(data): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, data);
  }

  updateArticle(id: number, value: any): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, value);
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}

interface GetResponseArticles {
  _embedded: {
    articles: Article[];
  }
} 
