import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class square
{
    row: number;
    col: number;
    value: number;
    sector: number = 0;

    constructor(@Inject(Number) x: number,@Inject(Number) y: number,@Inject(Number) num: number)
    {
        this.row = x;
        this.col = y;
        this.value = num;
        if(x < 3)
        {
            if(y < 3)
            { this.sector = 1; }
            else if(y < 6)
            { this.sector = 2; }
            else if(y < 9)
            { this.sector = 3; }
        }
        else if(x < 6)
        {
            if(y < 3)
            { this.sector = 4; }
            else if(y < 6)
            { this.sector = 5; }
            else if(y < 9)
            { this.sector = 6; }
        }
        else if(x < 9)
        {
            if(y < 3)
            { this.sector =(7); }
            else if(y < 6)
            { this.sector =(8); }
            else if(y < 9)
            { this.sector =(9); }
        }
    }

    setSector(sector: number)
    {
        this.sector = sector;
    }

    getSector() 
    {
        return this.sector;
    }

    squarePrint(): void
    {
        console.log('row: ' + this.row + ' col: ' + this.col + ' value: ' + this.value);
    }

    //returns true if the square's value is 0. 
    isEmpty(): boolean
    {
        if(this.value == 0)
        {
            return true;
        }
        return false;
    }

    toJSON()
    {
        return { value: this.value } 
    }


}
