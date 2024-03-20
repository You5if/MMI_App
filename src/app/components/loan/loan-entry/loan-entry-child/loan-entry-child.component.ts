import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loan-entry-child',
  templateUrl: './loan-entry-child.component.html',
  styleUrl: './loan-entry-child.component.css'
})
export class LoanEntryChildComponent {


@Input() month: number;
@Input() year: number;
@Input() amount: number;
@Input() remarks: string;

}
