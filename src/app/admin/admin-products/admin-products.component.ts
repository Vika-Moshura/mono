import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/ICategory';
import { IProductResponse } from 'src/app/shared/interfaces/IProduct';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ImagesService } from 'src/app/shared/services/images/images.service';
import { ProductService } from 'src/app/shared/services/products/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public isAdding = false;
  public editStatus = false;
  public adminCategories: ICategoryResponse[] = [];
  public adminProducts: IProductResponse[] = [];
  public productForm!: FormGroup;
  public isUploaded = false;
  private currentProductId!: string | number;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProducts();
  }
  addition(): void {
    this.isAdding = !this.isAdding;
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    })
  }
  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })

  }
  loadProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }
  addProduct(): void {
    if (this.editStatus) {
      this.productService.updateFirebase(this.productForm.value, this.currentProductId as string).then(() => {
        this.loadProducts();
      })
    }
    else {
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.loadProducts();
      })
    }
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.isAdding = false;
  }
  deleteProduct(product: IProductResponse): void {
    this.productService.deleteFirebase(product.id as string).then(() => {
      this.loadProducts();
    })
  }
  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
      count: 1
    });
    this.isUploaded = true;
    this.editStatus = true;
    this.currentProductId = product.id;
    this.isUploaded = true;
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.imagesService.uploadFile('images', file.name, file).then(
      data => {
        this.productForm.patchValue({
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
      this.productForm.patchValue({
        imagePath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}