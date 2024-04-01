import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GlobalService } from '../../global.service';
import { AuthService } from '../../security/auth/auth.service';
import { ChangeRoleComponent } from '../general-operations/change-role.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  constructor(
    private globalService: GlobalService,
    private cdref: ChangeDetectorRef,
    private _auth: AuthService,
    private dialog: MatDialog
  ) {}

  navClass: string = 'body'
  // navStatus: String = 'body'
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  ngOnInit() {
    this.globalService.navStatus$.subscribe(n => {
      if (n === 'login') {
        this.navClass = 'login-body'
      }else {
        this.navClass = 'body'
      }
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
 }

 logout() {
  // this._auth.logout()
  console.log(this._auth.getRole());
  
}

changeRole() {
  // console.log(this._auth.getIsTest());
  if(this.dialog.openDialogs.length==0){
    const dialogRef = this.dialog.open(ChangeRoleComponent, {
     // disableClose: true  
     
   });

   dialogRef.afterClosed().subscribe((result: boolean) => {
    console.log(result);
    if (result) {
      location.reload()
    }
   })
}
  
}


  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768){
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
