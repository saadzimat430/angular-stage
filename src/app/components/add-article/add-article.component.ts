import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/common/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article = new Article();
  submitted = false;
  apiUrl: string = "";

  constructor(private articleService: ArticleService,
    private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  newArticle(): void {
    this.submitted = false;
    this.article = new Article();
  }

  save(): void {

    const data = {
      title: this.article.title,
      content: this.article.content,
      imageUrl: this.article.imageUrl,
    };

    this.articleService.createArticle(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

}
