import { Component } from '@angular/core';
import { square } from "src/app/square/square.component";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})


export class board
{
    board: square[][];

    constructor()
    {
        this.board = [];
    }


    //creates an "empty" sudoku board, with all 
    //squares having a value of zero
    //code taken from the original generator.
    boardInit(): square[][]
    {
        this.board = [];
        //filling the sudoku board with "empty" squares (value 0)
        //and assigning them their sector based on column and row position.
        for(let i = 0; i < 9; i++)
        {
            this.board[i] = [];
            for(let j = 0; j < 9; j++)
            {
                this.board[i][j] = new square(i, j, 0);
            }
        }
        return this.board;



    }

    //changes the value of an indicated square using
    //column and row number
    setSquare(cell: square, newVal: number)
    {
        this.board[cell.row][cell.col].value = newVal;
    }


}
