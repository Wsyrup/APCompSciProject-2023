import { Component } from '@angular/core';
import { square } from "src/app/square/square.component";
import { board } from "src/app/board/board.component";


@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})

export class generator
{
    field: board = new board;
    hints: square[] = [];

    values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //initializes the board
    constructor()
    {
        this.field.boardInit();
    }

    //method used to efficiently scramble the array of possible values,
    //so that they are not randomly generated on the spot. 
    shuffleVals(): number[]
    {
        let newArray = [...this.values];
        for(let i = 0; i < newArray.length; i++)
        {
            let randex = Math.floor(Math.random()* 8);
            let temp = newArray[i];
            newArray[i] = newArray[randex];
            newArray[randex] = temp;
        }

        return newArray;
    }

    //method which fills the diagonal sectors with random values.
    //this may be refactored later and incorporated into
    //the main generate() function. 
    fillDiagonals()
    {
        this.sectorFill(1);
        this.sectorFill(5);
        this.sectorFill(9);
    }

    //method which fills in a 3 x 3 sector (used in fillDiagonals)
    sectorFill(sectorNum: number)
    {
        let arr : number[] = this.shuffleVals();
        let sectStart: number[] = [];
        if(sectorNum == 1)
        {
            sectStart = [0,0];
        }
        else if(sectorNum == 2)
        {
            sectStart = [0,3]
        }
        else if(sectorNum == 3)
        {
            sectStart = [0,6]
        }
        else if(sectorNum == 4)
        {
            sectStart = [3,0]
        }
        else if(sectorNum == 5)
        {
            sectStart = [3,3]
        }
        else if(sectorNum == 6)
        {
            sectStart = [3,6]
        }
        else if(sectorNum == 7)
        {
            sectStart = [6,0]
        }
        else if(sectorNum == 8)
        {
            sectStart = [6,3]
        }
        else if(sectorNum == 9)
        {
            sectStart = [6,6]
        }
        
        let counter = 0;
        for(let i = sectStart[0]; i < sectStart[0] + 3; i++)
        {
            for(let j = sectStart[1]; j < sectStart[1] + 3; j++)
            {
                this.field.board[i][j].value = arr[counter];
                counter++;
            }
        }
        return;
    }


    //recursively fills in the rest of the sudoku board
    //for some reason, this finishes before the whole board is complete. 
    //look into the cause of this:
    //this should (in theory) complete a sudoku puzzle. Occasionally,
    //a bad number call early on results in an unraveling of the whole
    //puzzle ~around the later row. 
    fillTheRest(row: number, column: number) : boolean
    {
        //checks if the method has reached the end of a row. If it has, 
        //moves on to the next row and resets the column counter.  
        if(column == this.field.board[0].length)
        {
            row += 1;
            column = 0;
        }

        if(row >= this.field.board.length-1 && column >= this.field.board[0].length-1)
        {
            return true;
        }
        

        //skip any cells with values already in them (only go through uninitialized cells).
        if(this.field.board[row][column].value != 0)
        {
            return this.fillTheRest(row, column + 1);
        } 

        
        
        for(let i = 0; i < this.values.length; i++)
        {
            if(this.fits(new square(row, column, this.values[i])))
            {
                this.field.board[row][column].value = this.values[i];
                if(this.fillTheRest(row, column+1))
                {
                    return true;
                }
                this.field.board[row][column].value = 0;
            }
        }   


        //no value has been found. 
        return false;

    }


    //new method, which fills in the independent diagonal matrices first
    //then recursively fills the remaining squares. 
    generate() : board
    {
        //this.field.boardInit();
        this.fillDiagonals();
        //starts at index 3 because the first sector is already filled in. 
        this.fillTheRest(0, 3);
        //values over 40 have significant performance impacts, and cause
        //the debugger to exit with code 2147483651. Look into this later,
        //because having a puzzle with over 40 holes is not too necessary
        //this.hints = this.puzzlize(25);
        return this.field;
    }


    //puzzlize method. this will create a puzzle by poking holes in the fully solved board
    //from generate. To make this playable, and ensure that it leads to a unique solution.
    //ie if removing a number makes the board unsolvable or leads to a second solution, 
    //put the value back and remove another one. s
    //If you want to, you can incorporate the coordinates of the "integral" cell and return
    //it to the user in the form of a hint.     

    //checks for both row and column, if the value fits inside the column/row
    //something in this method is causing the error
    fitsInRow(cell: square): boolean
    {
        for(let i = 0; i < 9; i++)
        {
            if(this.field.board[cell.row][i].value == cell.value && i != cell.col && cell.value != 0)
            {
                return false;
            }
        }
        return true;
    }

    fitsInCol(cell: square): boolean
    {
        for(let i = 0; i < 9; i++)
        {
            if(this.field.board[i][cell.col].value == cell.value && i != cell.row && cell.value != 0)
            {
                return false;
            }
        }
        return true;
    }

    fitsInSector(cell: square): boolean
    {
        //the starting index of each sector. From there, the loop will
        //go +3 in either direction and then stop.
        let sectStart: number[] = [];
        if(cell.getSector() == 1)
        {
            sectStart = [0,0];
        }
        else if(cell.getSector() == 2)
        {
            sectStart = [0,3]
        }
        else if(cell.getSector() == 3)
        {
            sectStart = [0,6]
        }
        else if(cell.getSector() == 4)
        {
            sectStart = [3,0]
        }
        else if(cell.getSector() == 5)
        {
            sectStart = [3,3]
        }
        else if(cell.getSector() == 6)
        {
            sectStart = [3,6]
        }
        else if(cell.getSector() == 7)
        {
            sectStart = [6,0]
        }
        else if(cell.getSector() == 8)
        {
            sectStart = [6,3]
        }
        else if(cell.getSector() == 9)
        {
            sectStart = [6,6]
        }


        for(let i = sectStart[0]; i < sectStart[0] + 3; i++)
        {
            for(let j = sectStart[1]; j < sectStart[1] + 3; j++)
            {
                if(this.field.board[i][j].value == cell.value && i != cell.row && j != cell.col && cell.value != 0)
                {
                    return false;
                }
            }
        }

        return true;
    }


    //does all the checks in one method. 
    fits(cell: square): boolean
    {
        return this.fitsInRow(cell) && this.fitsInCol(cell) && this.fitsInSector(cell);
    }

    puzzlize(holes: number): square[]
    {
        let hints: square[] = [];
        let counter: number = 0;
    
        while(counter < holes)
        {
            let randomRow: number = Math.floor(Math.random() * 8);
            let randomCol: number = Math.floor(Math.random() * 8);

            let oldval: number = this.field.board[randomRow][randomCol].value;

            this.field.board[randomRow][randomCol].value = 0;
            if(this.solve(this.field.board[randomRow][randomCol]) == oldval)
            {
                counter++;
                continue;
            }
            else
            {
                this.field.board[randomRow][randomCol].value = oldval;
                hints.push(this.field.board[randomRow][randomCol])
            }
        }
        
        return hints;

    }

    solve(cell: square): number
    {
        for(let i = 0; i < this.values.length; i++)
        {
            if(this.fits(new square(cell.row, cell.col, this.values[i])))
            {
                return this.values[i];
            }
        } 
        return -1 

        //return cell.value;
    }

    getHint(): square
    {
        let randomIndex = Math.floor(Math.random() * this.hints.length)
        return this.hints[randomIndex]
    }

}
