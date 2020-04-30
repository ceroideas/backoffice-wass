import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { BlogService } from '../../services/blog/blog.service';
import { AreasService } from '../../services/areas/areas.service';
import { CommentsService } from '../../services/comments/comments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.page.html',
  styleUrls: ['../../app.component.scss', './index.page.scss']
})

export class DashboardPage implements OnInit {

  users = 0;
  progressBarUsers = true;

  areas = 0;
  progressBarAreas = true;

  comments = 0;
  progressBarComments = true;

  blogs = 0;
  progressBarBlogs = true;

  constructor(
    private usersService: UsersService,
    private blogService: BlogService,
    private areasService: AreasService,
    private commentsService: CommentsService,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getBlogs();
    this.getComments();
    this.getAreas();
  }

  getUsers() {
    this.usersService.users().subscribe((res) => {
      if (res.success) {
        this.progressBarUsers = false;
        this.users = res.users.length;

      }
    }, (error) => {

    });
  }

  getBlogs() {
    this.blogService.getAllBlogs().subscribe((res) => {
      if (res.success) {
        this.progressBarBlogs = false;
        this.blogs = res.blogs.length;

      }
    }, (error) => {

    });
  }

  getComments() {
    this.commentsService.getAllComments().subscribe((res) => {
      if (res.success) {
        this.progressBarComments = false;
        this.comments = res.comments.length;

      }
    }, (error) => {

    });
  }

  getAreas() {
    this.areasService.getAllAreas().subscribe((res) => {
      if (res.success) {
        this.progressBarAreas = false;
        this.areas = res.areas.length;

      }
    }, (error) => {

    });
  }
}
