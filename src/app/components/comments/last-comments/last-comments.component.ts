import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../../../services/comments/comments.service';

@Component({
  selector: 'app-last-comments',
  templateUrl: './last-comments.component.html',
  styleUrls: ['./last-comments.component.scss']
})
export class LastCommentsComponent implements OnInit {

  comments = [];
  progressBar = true;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.commentsService.lastComments().subscribe(res => {
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
