import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  postForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });
  categories: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; id: number; post: any },
    private authService: AuthService,
    private categoryService: CategoryService,
    private postService: PostService
  ) {
    this.getCategories();
    if (this.data.id > 0) {
      this.loadForm();
    }
  }

  getTitle() {
    return `${this.data.action} post`;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((resp: any) => {
      this.categories = resp;
    });
  }

  onSubmit() {
    if (this.postForm?.valid) {
      const user = this.authService.getLoggedInUser();
      const newPost = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        category: this.postForm.value.category,
        user: user.id,
      };

      const { action, id } = this.data;

      if (action.toLowerCase() === 'crear') {
        this.postService.createPosts(newPost).subscribe((resp: any) => {
          Swal.fire({
            title: 'Post creado exitosamente!',
            text: 'Post creado, ya puedes visualizarlo',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        });
      } else if (action.toLowerCase() === 'editar') {
        this.postService.editarPost(newPost, id).subscribe((resp: any) => {
          Swal.fire({
            title: 'Post editado exitosamente!',
            text: 'Post editado, ya puedes visualizarlo',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        });
      }

      this.dialogRef.close(newPost);
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  loadForm() {
    this.postForm.setValue({
      title: this.data.post?.title,
      content: this.data.post?.content,
      category: this.data.post?.category.id,
    });
  }
}
