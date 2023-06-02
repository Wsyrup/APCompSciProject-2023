import { Component, OnInit } from '@angular/core';
import { board } from '../board/board.component';
import { generator } from '../generator/generator.component';
import { square } from '../square/square.component';

import { Observable, Subscriber, Subscription, Observer, of } from 'rxjs';


@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent implements OnInit {
  solved: boolean;

  totalSolved = 0;
  sudoku: generator = new generator();

  hints: square[] = [];

  sudokuGrid: board = new board();

  sudokuObservable: Observable<board> = of(this.sudokuGrid);
  
  sudokuSub: Subscription;

  //changing to a shallow copy. 
  solution: square[][] = [];
  
  
  //shallow copy
  initialSudokuGrid: square[][] = [];
  //isZero: boolean = false;

  completed: boolean = false;
  constructor() {
    this.solved = false;
    this.sudokuSub = Subscription.EMPTY;
   }

  ngOnInit() {
    this.solved = false;
    this.initGrid();

  }

  ngAfterContentInit()
  {
    
  }

  initGrid() {
    //initializes sudoku grid. 
    this.sudoku.generate();
    
    //shallow copy of the solved puzzle
    this.solution = JSON.parse(JSON.stringify(this.sudoku.field.board));

    //initializes hints array. 
    this.hints = this.sudoku.puzzlize(20);

    //sets the board to display as the puzzle. 
    this.sudokuGrid = this.sudoku.field;
    //shallow copy of the puzzle
    this.initialSudokuGrid = JSON.parse(JSON.stringify(this.sudokuGrid.board));

    this.sudokuObservable = Observable.create(
    {
        //board : this.sudoku.generate()
    });

    //creating a shallow copy instead of a deep copy. //this has issues because of the 
    //dynamic nature of this.sudokuGrid.board. Will investigate how to create a 
    //deep copy containing only the values.


   // this.initialSudokuGrid = this.initialSudokuGrid = [...this.sudokuGrid.board];

  }


  //focus on this guy. 
  regenerate()
  {
    this.solved = false;
    this.sudoku.generate();
    this.solution = JSON.parse(JSON.stringify(this.sudoku.field.board));
    this.hints = this.sudoku.puzzlize(1);
    this.sudokuGrid = this.sudoku.field;
    this.initialSudokuGrid = JSON.parse(JSON.stringify(this.sudokuGrid.board));
    
    

    
    /*
    this.sudokuSub = this.sudokuObservable.subscribe({
      next: (board) => {
        this.sudoku.generate();

        this.solution = JSON.parse(JSON.stringify(this.sudoku.field.board));
        this.hints = this.sudoku.puzzlize(1);
        this.sudokuGrid = this.sudoku.field;
        this.initialSudokuGrid = JSON.parse(JSON.stringify(this.sudokuGrid.board));
      }
    });
    */

    

  }

  onModelChange(row: number, cell: number) {
    if (this.sudokuGrid.board[row][cell].value !== 0 && this.sudokuGrid.board[row][cell].value !== undefined) {
      this.sudokuGrid.board[row][cell] = this.sudokuGrid.board[row][cell];
    } else if (this.initialSudokuGrid[row][cell].value === 0) 
    {
      this.sudokuGrid.board[row][cell].value = 0;
    }
    else
    {
      this.sudokuGrid.board[row][cell].value = 0;
    }

    
  }

  //for now, this causes an error when its value changes, but the error is
  //harmless. Maybe look into it.   
  getColor(row: number, cell: number): string {
    //this.solved = this.checkSolved();
    this.solved = this.checkSolved();

    if (this.initialSudokuGrid[row][cell].value !== 0) {
      return 'white';
    } else if (this.sudokuGrid.board[row][cell].value === 0) {
      return 'gray';
    } else if (this.sudokuGrid.board[row][cell].value != this.solution[row][cell].value) 
    {
      return '#F67280';
    } else {
      return 'lightgray';
    }
  }

  checkSolved() : boolean
  {
    for(let i = 0; i < this.sudokuGrid.board.length; i++)
    {
      for(let j = 0; j < this.sudokuGrid.board[0].length; j++)
      {
        if(this.sudokuGrid.board[i][j].value != this.solution[i][j].value)
        {
          console.log("unsolved");
          return false;
        }    
      }
    } 
    //this.totalSolved++;
    console.log("correct");
    //this.regenerate();
    return true;
  }

  /*checkSolved(row: number, column: number)
  {
    if(this.sudokuGrid.board[row][column].value === this.solution[row][column].value)
    {
      console.log("solved is true");
      this.solved = true;
    }

    console.log("solved is false");
    this.solved = false;
  }*/



}
