import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/common/article';
import { ArticleService } from 'src/app/services/article.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  article: Article = new Article();
  submitted = false;

  constructor(private articleService: ArticleService,
    private router: Router, private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    } else {
      this.router.navigateByUrl('/login');
    }
    
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
