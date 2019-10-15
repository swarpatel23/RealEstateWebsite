import {MatSliderModule} from "@angular/material";
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    imports: [MatSliderModule,MatExpansionModule,MatIconModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,TextFieldModule,MatNativeDateModule,
        MatButtonModule,MatProgressSpinnerModule],
    exports: [MatSliderModule,MatExpansionModule,MatIconModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,TextFieldModule,MatNativeDateModule,
        MatButtonModule,MatProgressSpinnerModule]
})
export class MaterialModule{} 