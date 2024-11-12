import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: IPost[] = [];
  categories: any[] = [];
  selectedCategory?: number;

  constructor(
    private dialog: MatDialog,
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getPosts();
    this.getCategories();
  }

  openActionPostForm(action: string, id: number, post: any) {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '60vw',
      data: {
        action,
        id,
        post,
      },
    });

    dialogRef.afterClosed().subscribe((newPost) => {
      if (newPost) {
        // Actualiza la lista de posts con el nuevo post
        this.getPosts();
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    });
  }

  filterPosts() {
    console.log(this.selectedCategory);

    if (!this.selectedCategory) {
      this.getPosts();
    } else {
      this.postService
        .getPostByCategory(this.selectedCategory as number)
        .subscribe((resp: any) => {
          this.posts = resp.posts;
          console.log('resp', resp);
        });
    }
  }

  getPosts() {
    this.postService.getPosts().subscribe((resp: IPost[] | any) => {
      this.posts = resp;
    });
  }
}
