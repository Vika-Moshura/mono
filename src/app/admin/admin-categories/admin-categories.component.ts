import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/ICategory';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImagesService } from 'src/app/shared/services/images/images.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  public adminCategories: ICategoryResponse[] = [];
  public isAdding = false;
  public editStatus = false;
  public editID!: number;
  public categoryForm!: FormGroup;
  public isUploaded = false;
  private currentCategoryId = 0;
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imagesService:ImagesService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }
  addition(): void {
    this.isAdding =!this.isAdding;
  }
  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required],
      id:[null]
    })
  }
  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;      
    })
  }
  addCategory(): void {
    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategories();
      })
    }
    else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
      })
    }
    this.editStatus = false;    
    this.categoryForm.reset();
    this.isUploaded = false;
    this.isAdding = false;
  }
  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
      id: category.id,
    });
    this.editStatus = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories();
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imagesService.uploadFile('images', file.name, file).then(
      data => {
        this.categoryForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      }
    ).catch(err => {
      console.log(err);
    })
  }

  
  deleteImage(): void {
    this.imagesService.deleteImage(this.valueByControl('imagePath')).then(() => {
      console.log("File deleted");
      this.isUploaded = false;
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}
