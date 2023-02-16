import { NgModule } from "@angular/core";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// other modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL = [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
]
@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ...MATERIAL,
        FormsModule,
        ReactiveFormsModule
    ],
})

export class SharedModule { }
