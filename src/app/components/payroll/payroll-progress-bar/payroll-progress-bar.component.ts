import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PayrollProgressBarService } from './payroll-progress-bar.service';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payroll-progress-bar',
  templateUrl: './payroll-progress-bar.component.html',
  styleUrl: './payroll-progress-bar.component.css'
})
export class PayrollProgressBarComponent implements OnInit {
  @Input() isProgressActive = false;
  @Input() timeLoad = 0;
  @Input() empIdData = 0;
  @Input() refreshScreen = false;
  @Input() empScreen = false;
  @Output() canceled = new EventEmitter<void>();
  @Output() empProcessFinished = new EventEmitter<void>();
  @Input() message: string = ""



  constructor(private service: PayrollProgressBarService,
     private router: Router,
     private activeRoute: ActivatedRoute,) {}

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
    this.progressInterval = setInterval(() => {
      this.progressPercentage += increment;
      if (this.progressPercentage > 100) {
        this.progressPercentage = 100;
        this.isProgressComplete = true;
        this.message = "Success!"
        clearInterval(this.progressInterval);
        if (this.empScreen) {
        //   const empData = {"employeeId": this.empIdData}
        // this.service.compSettAudit(empData).subscribe((result) => {
        //   console.log(result);
        //   // this.router.navigate(['/system/employee-term-end'], { relativeTo: this.activeRoute.parent });
        //   this.empProcessFinished.emit();
        // }, (error) =>{
        //   console.log(error);
        // })
        this.empProcessFinished.emit();
        }
       
        this.canceled.emit();
      }
    }, 100);
    if (!this.empScreen) {
      if (this.refreshScreen) {
        this.service.getStatusRefresh().subscribe((response) => {
          console.log(response);
          
        }, (error) => {
          // this.message = " Error!"
          // this.cancelProgress()
        })
      }else {
          this.service.getStatusPayroll().subscribe((response) => {
            console.log(response);
            
            
          }, (error) => {
            
          })
        
      }
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
