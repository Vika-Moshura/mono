import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cabinet-password',
  templateUrl: './cabinet-password.component.html',
  styleUrls: ['./cabinet-password.component.scss']
})
export class CabinetPasswordComponent implements OnInit {
  public updatePasswordForm!:FormGroup
  constructor() { }

  ngOnInit(): void {
  }
  updatePassword():void{

  }
  cancelChanges():void{
    
  }

}
