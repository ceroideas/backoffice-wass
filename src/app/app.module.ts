import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FileUploadModule } from '@iplab/ngx-file-upload';

import { NgxEditorModule } from 'ngx-editor';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { MomentModule } from 'ngx-moment';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {BarRatingModule } from "ngx-bar-rating";
import {ColorSketchModule} from 'ngx-color/sketch';

/**
 * @ Pipes
 */
import { UsersPipe } from './pipes/filters/users.pipe';
import { BlogsPipe } from './pipes/filters/blogs.pipe';
import { CommentsPipe } from './pipes/filters/comments.pipe';


/**
 * @ Pages
 */

import { DashboardPage } from './pages/dashboard/index.page';
import { UserPage } from './pages/users/index.page';
import { StatisticsPage } from './pages/statistics/index.page';
import { AreasPage } from './pages/areas/index.page';
import { CommentsPage } from './pages/comments/index.page';
import { BlogPage } from './pages/blog/index.page';
import { PlacesPage } from './pages/places/index.page';
import { CommunitiesPage } from './pages/communities/communities.page';

/**
 * @ Components
 */
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LastUsersComponent } from './components/users/last-users/last-users.component';
import { LastCommentsComponent } from './components/comments/last-comments/last-comments.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { ListCommentsComponent } from './components/comments/list-comments/list-comments.component';
import { BarChartComponent } from './components/statistics/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/statistics/pie-chart/pie-chart.component';
import { CreateUsersComponent } from './components/users/create/create.component';
import { CreateBlogComponent } from './components/blog/create/create.component';
import { EditUsersComponent } from './components/users/edit/edit.component';
import { EditBlogComponent } from './components/blog/edit/edit.component';
import { CreatePlacesComponent } from './components/places/create/create.component';
import { EditPlacesComponent } from './components/places/edit/edit.component';
import { CreateCommunitiesComponent } from './components/communities/create/create.component';
import { EditCommunitiesComponent } from './components/communities/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPage,
    UserPage,
    StatisticsPage,
    AreasPage,
    CommentsPage,
    BlogPage,
    PlacesPage,
    CommunitiesPage,

    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LastUsersComponent,
    LastCommentsComponent,
    BreadcrumbsComponent,
    ListUsersComponent,
    ListCommentsComponent,
    BarChartComponent,
    PieChartComponent,
    CreateUsersComponent,
    CreateBlogComponent,
    EditUsersComponent,
    EditBlogComponent,
    UsersPipe,
    BlogsPipe,
    CommentsPipe,
    CreatePlacesComponent,
    EditPlacesComponent,
    CreateCommunitiesComponent,
    EditCommunitiesComponent,

  ],
  imports: [
    ColorSketchModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCenAVKNfyNqNVSk1Z9LRtArx2S-kLVXYk'
    }),
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FileUploadModule,
    NgxEditorModule,
    NgxFlagIconCssModule,
    MomentModule,
    GooglePlaceModule,
    NgxPaginationModule,
    BarRatingModule,

    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
