import { Component, OnInit, OnDestroy } from '@angular/core';

import { PostsService } from 'src/app/shared/posts.service';
import { Post } from 'src/app/shared/components/interfaces';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(
    private postService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.pSub = this.postService.getall().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alertService.warning('Post was deleted');
    });
  }
}
