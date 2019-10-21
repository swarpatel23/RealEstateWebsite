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
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
    imports: [MatSliderModule,MatExpansionModule,MatIconModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,TextFieldModule,MatNativeDateModule,
        MatButtonModule,MatProgressSpinnerModule,MatDialogModule,MatRadioModule,MatSnackBarModule,MatCardModule,MatButtonToggleModule,
        MatTabsModule],
    exports: [MatSliderModule,MatExpansionModule,MatIconModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,TextFieldModule,MatNativeDateModule,
        MatButtonModule,MatProgressSpinnerModule,MatDialogModule,MatRadioModule,MatSnackBarModule,MatCardModule,MatButtonToggleModule,
        MatTabsModule]
})
export class MaterialModule{} 