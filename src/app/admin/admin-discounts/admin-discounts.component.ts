import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage'
@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrls: ['./admin-discounts.component.scss']
})
export class AdminDiscountsComponent implements OnInit {
  public adminDiscounts: IDiscountResponse[] = [];
  public isAdding = false;
  public editID!: number;
  public discountForm!: FormGroup;
  public editStatus = false;
  public isUploaded = false;
  public uploadPercent: number = 0;
  private currentDiscountId = 0;
  constructor(
    private discountService: DiscountsService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }
  addition(): void {
    this.isAdding ? this.isAdding = false : this.isAdding = true;
  }
  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      date: [new Date(), Validators.required],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
    })
  }
  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }
  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountId).subscribe(() => {
        this.loadDiscounts();
      })
    }
    else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      })
    }
    this.editStatus = false;
    this.discountForm.reset({date:new Date()});
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isAdding = false;
  }
  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      date: discount.date,
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    });
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscounts();
    })
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file).then(
      data => {
        this.discountForm.patchValue({
          imagePath: data
        })
        this.isUploaded = true;
      }
    ).catch(err => {
      console.log(err);
    })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress;
        });
        await task;
        url = await getDownloadURL(storageRef)
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('Wrong format');
    }
    return Promise.resolve(url);
  }
  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log("File deleted");
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        imagepath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

}
