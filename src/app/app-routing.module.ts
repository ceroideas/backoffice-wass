import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './pages/dashboard/index.page';
import { UserPage } from './pages/users/index.page';
import { StatisticsPage } from './pages/statistics/index.page';
import { AreasPage } from './pages/areas/index.page';
import { CommentsPage } from './pages/comments/index.page';
import { BlogPage } from './pages/blog/index.page';
import { PlacesPage } from './pages/places/index.page';
import { CommunitiesPage } from './pages/communities/communities.page';
import { CreateUsersComponent } from './components/users/create/create.component';
import { CreateBlogComponent } from './components/blog/create/create.component';
import { EditBlogComponent } from './components/blog/edit/edit.component';
import { EditUsersComponent } from './components/users/edit/edit.component';
import { CreatePlacesComponent } from './components/places/create/create.component';
import { EditPlacesComponent } from './components/places/edit/edit.component';

import { CreateCommunitiesComponent } from './components/communities/create/create.component';
import { EditCommunitiesComponent } from './components/communities/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPage },
  { path: 'users', component: UserPage },
  { path: 'users/create', component: CreateUsersComponent },
  { path: 'users/edit/:id', component: EditUsersComponent },
  { path: 'statistics', component: StatisticsPage },
  { path: 'areas', component: AreasPage },
  { path: 'comments', component: CommentsPage },
  { path: 'blog', component: BlogPage },
  { path: 'blog/create', component: CreateBlogComponent },
  { path: 'blog/edit/:id', component: EditBlogComponent },
  { path: 'places', component: PlacesPage },
  { path: 'places/create', component: CreatePlacesComponent },
  { path: 'places/edit/:id', component: EditPlacesComponent },
  { path: 'communities', component: CommunitiesPage },
  { path: 'communities/create', component: CreateCommunitiesComponent },
  { path: 'communities/edit/:id', component: EditCommunitiesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
