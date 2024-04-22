import { trigger, transition, style, animate } from "@angular/animations";

export interface INavbarData {
    routeLink: string;
    icon?: string;
    label: string;
    expanded?: boolean;
    items?: INavbarData[];
    svgicon: svgicon;
    roles: string[];
}

export interface svgicon {
  style: string;
  preserveAspectRatio: string;
  transform: string;
  fill: string;
  stroke: string;
  d: string;
  src: string;
}

export interface APIResultModel {
  id: number;
  errorNo: number;
  errorMessage: string;
  documentNo: string;
  sQLErrorNumber: number;
  sQLErrorSeverity: number;
  sQLErrorState: number;
  sQLObjectName: string;
  sQLErrorLineNo: number;
  sQLErrorMessage: string;
}

export const fadeInOut = trigger('fadeInOut',[
    transition(':enter', [
      style({opacity: 0}),
      animate('220ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('220ms',
        style({opacity: 0})
      )
    ])
  ])