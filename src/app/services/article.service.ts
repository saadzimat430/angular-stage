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
    const headers = new HttpHeaders({ Authorization: 'Basic ' + environment.apiKey });

    return this.httpClient.get<GetResponseArticles>(this.baseUrl, {headers});
  }

}

interface GetResponseArticles {
  _embedded: {
    articles: Article[];
  }
} 
