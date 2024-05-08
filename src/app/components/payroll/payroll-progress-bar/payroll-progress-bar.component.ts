import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PayrollProgressBarService } from './payroll-progress-bar.service';
import { response } from 'express';

@Component({
  selector: 'app-payroll-progress-bar',
  templateUrl: './payroll-progress-bar.component.html',
  styleUrl: './payroll-progress-bar.component.css'
})
export class PayrollProgressBarComponent implements OnInit {
  @Input() isProgressActive = false;
  @Input() timeLoad = 0;
  @Input() refreshScreen = false;
  @Output() canceled = new EventEmitter<void>();
  message: string = "Processing payroll!"



  constructor(private service: PayrollProgressBarService) {}

  progressPercentage = 0;
  isProgressComplete = false;
  private progressInterval: any;

  ngOnInit() {
    if (this.isProgressActive) {
      if (this.refreshScreen) {
        this.message = "Processing attendances!"
      }
      this.startProgress();
    }
  }

  ngOnChanges() {
    if (this.isProgressActive && !this.progressInterval) {
      this.startProgress();
    }
  }

  startProgress() {
    this.progressPercentage = 0;
    this.isProgressComplete = false;
    const increment = 100 / (this.timeLoad * 10); // 150 steps in 15 seconds
    if (this.refreshScreen) {
      this.service.getStatusRefresh().subscribe((response) => {
        this.progressInterval = setInterval(() => {
          this.progressPercentage += increment;
          if (this.progressPercentage > 100) {
            this.progressPercentage = 100;
            this.isProgressComplete = true;
            this.message = "Success!"
            clearInterval(this.progressInterval);
            this.canceled.emit();
          }
        }, 100);
      }, (error) => {
        this.message = " Error!"
        this.cancelProgress()
      })
    }else {
      this.service.getStatusPayroll().subscribe((response) => {
        this.progressInterval = setInterval(() => {
          this.progressPercentage += increment;
          if (this.progressPercentage > 100) {
            this.progressPercentage = 100;
            this.isProgressComplete = true;
            this.message = "Success!"
            clearInterval(this.progressInterval);
            this.canceled.emit();
          }
        }, 100);
      }, (error) => {
        this.message = " Error!"
        this.cancelProgress()
      })
    }
  }

  cancelProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.isProgressComplete = true;
      this.canceled.emit();
    }
  }
}
