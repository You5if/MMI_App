import { Injectable } from "@angular/core";

@Injectable()
export class AppGlobals {
  /* Local Development */
  //  readonly baseDomainUrl: string = 'localhost:4200';
  //  readonly baseappurl: string = 'http://localhost:4200/';
  //  readonly baselandingappurl: string = 'http://localhost:4200/';

  
  /* Development Server */
  // readonly baseDomainUrl: string = "qualityhouse.auto-paymcs.com";
//   readonly baseDomainUrl: string = "http://49.50.77.201/qualityhouse/";
//   // readonly baseAppUrl: string = "http://qualityhouse.auto-paymcs.com/";
//   readonly baseAppUrl: string = "http://49.50.77.201/qualityhouse/";
//   // readonly baseLandingAppUrl: string = "http://qualityhouse.auto-paymcs.com/";
//  readonly baseLandingAppUrl: string = "http://49.50.77.201/qualityhouse/";

  /* Live Server */
  // readonly baseDomainUrl: string = "aladdinshipping.com";
  // readonly baseAppUrl: string = "https://aladdinshipping.com/";
  // readonly baseLandingAppUrl: string = "https://aladdinshipping.com/";

  /* Local Development */
  //  readonly baseAPIFileUrl: string = 'https://localhost:44377/';
  //  readonly baseAPIUrl: string = 'https://localhost:44377/api/';
  //   readonly baseAPIRootUrl: string = 'https://localhost:44377/api/';

  //global dropdowns 
  departments: string[] = [
    "Administration",      
 "Finance" ,    
 "Human Resources"  ,   
 "Engineering and designing",    
 "Marketing and Sales",      
 "Procurement",     
 "Public Relations",     
 "Operations",      
 "Production",      
 "Services"
  ]

 jobTitles: string[] = [
    "Accountant" ,    
"Human Resources Officer",     
"Draftsman",     
"Purchasing Officer",     
"Operation Manager",     
"Production Manager",    
"Foreman",     
"Machine Operator",  
"Sales Engineer",
"Driver",
"Security Guard", 
"Plant Manager" , 
"Fabricator",     
"Painter",     
"Welder",     
"Electrician",      
"Store keeper",     
"Office Boy",     
"Helper"
  ];

  /* Development Server */
  readonly realappUrl: string = "https://mmi.autopay-mcs.com/";
  readonly baseAPIFileUrl: string = "https://inventoryapi.autopay-mcs.com/";
  readonly baseAPIUrl: string = "https://inventoryapi.autopay-mcs.com/api/";
  readonly baseAPIRootUrl: string = "https://inventoryapi.autopay-mcs.com/api/";

  /* Live Server */
  // readonly baseAPIFileUrl: string = "https://appapi.aladdinshipping.com/";
  // readonly baseAPIUrl: string = "https://appapi.aladdinshipping.com/api/";
  // readonly baseAPIRootUrl: string = "https://appapi.aladdinshipping.com/api/";

  /* Development Server */
  // readonly baseReportUrl: string = 'http://shippingreports.autopay-mcs.com/default.aspx?';
  readonly baseReportUrl: string = 'https://inventoryreports.autopay-mcs.com/default.aspx?';
  readonly baseReportEmailUrl: string = 'http://49.50.77.201/shippingreports/default2.aspx?';

  /* Live Server */
  // readonly baseReportUrl: string =
  //   "https://appreport.aladdinshipping.com/default.aspx?";

  // readonly baseAppName: string = 'WVI.ERP';
  // step 2 of security (next: common.service.ts > requestOptions() > this.userToken)
  readonly baseAppName: string = "MMI";
  baseUserProfile: any;
  
  // comment from Milesh
}
