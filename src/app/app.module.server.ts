import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeprofileComponent } from './components/employeeprofile/employeeprofile.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule, 
    TextFieldModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppServerModule {}
