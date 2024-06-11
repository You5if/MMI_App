import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { CommonService } from '../../common.service';
import { AuthService } from '../../../security/auth/auth.service';

@Component({
  selector: 'app-search-in-table',
  templateUrl: './search-in-table.component.html',
  styleUrl: './search-in-table.component.css'
})
export class SearchInTableComponent {
  @Input() screenName: string = ''
  @Input() screenTableId: number = 0
  @Input() searchBy: any[] = []
  @Output() outputEvent: any = new EventEmitter();

  searchText: string = ''
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isMenuOpen: boolean = false;
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  empList: any[] = []

  sort: string = ""
  filter: string  =""
  nameFilter: string = ""
  dateFilter: string = ""
  pTableName = this.screenName
  pTableId: number = this.screenTableId;
  pageData: any
  isLastPage = false;
  recordsPerPage: number | undefined;
  totalRecords!: number;

  
  constructor(
    private _cf: CommonService,
    private _auth: AuthService,
  ) {
    this.pTableName = this.screenName;
    this.pTableId = this.screenTableId;
    this.recordsPerPage = 10;
    this.isLastPage = false;
    
  }
  
  openSearchResult() {
    this.isMenuOpen = true;
    this.pageData = {
      tableId: this.screenTableId,
      userId: Number(this._auth.getUserId()), //later to change to take from token _auth.getUserId(),
      recordsPerPage: this.recordsPerPage,
      pageNo: 1,
      transId: 1,
      lastPage: this.isLastPage,
      company: 1,
      roleId: Number(this._auth.getRole()),
      browser: '',
      resol: '',
      device: '',
      isTest: this._auth.getIsTest(), // must take with roleid(change) and is key to fetching data
      sort: '',
      filter: ""
    }
    this.onSearch()
      this.trigger.openMenu();
    
  }
  
  closeSearchResult() {
    this.isMenuOpen = false;
  }
  
  onMenuClosed() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    const isInsideSearchContainer = this.searchContainer.nativeElement.contains(clickedElement);

    if (!isInsideSearchContainer) {
      this.closeSearchResult();
    }
  }


  refreshMe() {
    // console.log('reached here');
    this._cf.newGetPageData(this.screenName, this.pageData, this.sort, this.filter).subscribe((result: any) => {
      // this._ui.loadingStateChanged.next(false);
      // this.totalRecords = result[0].totalRecords;
      this.empList = result;
      // console.log('Reached here!');
      // console.log(result);
    })
  }

  
  onSearch() {
    for (let i = 0; i < this.searchBy.length; i++) {
      this.searchBy[i].resultList = []
      console.log(this.searchText);
    const term = "'%"+this.searchText+"%'"
    const encodedSearchTerm = encodeURIComponent(term);
    this.nameFilter = this.searchBy[i].query + " like "+encodedSearchTerm
    if (this.dateFilter === "") {
      this.filter = this.nameFilter
      console.log(this.filter);
      
      this._cf.newGetPageData(this.screenName, this.pageData, this.sort, this.filter).subscribe((result: any) => {
        // this._ui.loadingStateChanged.next(false);
        // this.totalRecords = result[0].totalRecords;
        this.searchBy[i].resultList = result;
        if (result.length === 0) {
          this.searchBy[i].resultList = []
        }
        // console.log('Reached here!');
        // console.log(result);
      })
    }else {
      this.filter = this.nameFilter + " and "+ this.dateFilter
      console.log(this.filter);
      this.refreshMe()
    }
      
    }

  }

  onClearSearch() {
    this.searchText = ''
  }

  sendSearchResult(text: any, query: string) {
    console.log(text);
    
    const searchResult = {
      text: text,
      query: query
    }
    this.outputEvent.emit(searchResult);
    this.closeSearchResult();
  }

}
