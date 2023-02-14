import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.scss']
})
export class CallDialogComponent implements OnInit {
  ngOnInit(): void {
    
  }

  public callForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ){}
  
  initCallForm():void{
    this.callForm = this.fb.group({
      firstName:[null, Validators.required],
      phoneNUmber:[null, Validators.required]
    })
  }

  sendRequest():void{

  }
}
