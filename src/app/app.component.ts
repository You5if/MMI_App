import { Component } from '@angular/core';
import { GlobalService } from './global.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MMI_app';

  isSideNavCollapsed = false;
  screenWidth = 0;

  navStatus: String = 'login'

  constructor(
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    this.globalService.navStatus$.subscribe(n => this.navStatus = n)
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
