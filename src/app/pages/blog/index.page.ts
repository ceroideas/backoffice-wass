import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class BlogPage implements OnInit {

  blogs: any;
  progressBar = true;
  pageActived: number = 1;
  filterBlogs = '';

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getAllBlogs().subscribe(res => {
      this.progressBar = false;

      if (res.success) {
        this.blogs = res.blogs;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  deleteBlog(blog) {
    this.progressBar = true;
    this.blogService.deleteBlog(blog._id).subscribe((res) => {
      if (res.success) {
        const index = this.blogs.indexOf(blog);
        this.blogs.splice(index, 1);
        this.progressBar = false;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  firstImage(blog) {
    return blog.images[0].img ? blog.images[0].img : '';
  }

}
