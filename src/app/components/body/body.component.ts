import { style } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  constructor(
    private globalService: GlobalService,
    private cdref: ChangeDetectorRef
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
