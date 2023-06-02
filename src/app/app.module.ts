import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SudokuBoardComponent } from './sudoku-board/sudoku-board.component';
import {  generator } from './generator/generator.component';
import {  square } from './square/square.component';
import { board } from './board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuBoardComponent,
    generator,
    square,
    board,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
