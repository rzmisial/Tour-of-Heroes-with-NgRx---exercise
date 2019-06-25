// material.module.ts

import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatDividerModule,
  MatTabsModule,
  MatTableModule,
  MatListModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatInputModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatOptionModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatInputModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTableModule
  ]
})

export class MaterialModule {}
