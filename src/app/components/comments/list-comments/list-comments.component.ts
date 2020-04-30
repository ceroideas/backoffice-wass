import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../../services/comments/comments.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.scss']
})
export class ListCommentsComponent implements OnInit {

  comments: any;
  progressBar = true;
  pageActived: number = 1;
  filterComments = '';
  alertReport: any;

  constructor(private commentsService: CommentsService) { 
    this.alertReport = {
      show: false,
      type: null,
      quantity: 0
    };
  }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.commentsService.getAllComments().subscribe(res => {
      this.progressBar = false;

      if (res.success) {
        this.comments = res.comments;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }

  deleteComment(comment) {
    this.progressBar = true;
    this.commentsService.deleteComment(comment._id).subscribe((res) => {
      if (res.success) {
        const index = this.comments.indexOf(comment);
        this.comments.splice(index, 1);
        this.progressBar = false;
      } else {
      }
    }, (error) => {
      this.progressBar = false;
      console.log(error);
    });
  }
}
