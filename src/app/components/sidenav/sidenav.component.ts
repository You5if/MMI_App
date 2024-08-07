import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { getWindow } from "ssr-window";
import { ActivatedRoute, Router } from '@angular/router';
import { INavbarData, fadeInOut } from './helper';
import { GlobalService } from '../../global.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveChangesComponent } from '../general-operations/tenure-options/save-changes.component';
import { AppGlobals } from '../../app.global';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;

}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations: [
    fadeInOut,
    trigger('rotate',[
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms',
          keyframes([
            style({
              transform: 'rotate(0deg)', offset: '0'
            }),
            style({
              transform: 'rotate(2turn)', offset: '1'
            })
          ])
        )
      ])
    ])
    
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  navStatus: String = 'login'
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.screenWidth = getWindow().innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(
    public router: Router,
    private globalService: GlobalService,
    private _globals: AppGlobals,
    private dialog: MatDialog,
    ) {

  }

  ngOnInit(): void {
    this.screenWidth = getWindow().innerWidth;
  }

  showMenuItem(data: any): boolean {
    return data.roles.includes(localStorage.getItem(this._globals.baseAppName + '_role'));
  }
  filterItemsByRole(data: any): any {
    if (data && data.items && data.items.length > 0) {
      return {
        ...data,
        items: data.items.filter((item: any) => item.roles.includes(localStorage.getItem(this._globals.baseAppName + '_role')))
      };
    }
    return data;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  toggleCollapse2(): void {
    this.collapsed = true;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    for (let i = 0; i < this.navData.length; i++) {
      const item = this.navData[i];
      this.shrinkItems(item);
    item.expanded = !item.expanded;
    }
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    // this.globalService.navStatus$.subscribe(n => this.navStatus = n)
    // if (this.navStatus === 'system') {
      if (!this.multiple) {
        for (let modelItem of this.navData) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    // }else if (this.navStatus === 'entry') {
    //   if(this.dialog.openDialogs.length==0){
    //     const dialogRef = this.dialog.open(SaveChangesComponent, {
    //      disableClose: true  
         
    //    });
  
    //    dialogRef.afterClosed().subscribe((result: boolean) => {
    //     if (result) {
          
    //     }else {
    //       this.router.navigate([`/${item.routeLink}`]);
    //     }
    //    })
    // }
    // }
  }
}
