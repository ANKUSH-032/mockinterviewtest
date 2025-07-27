import { Component } from '@angular/core';
import { LayoutService } from './service/service/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showSidebar = true;
  title = 'mockinterviewtest';
  constructor(private layoutService: LayoutService) {
    this.layoutService.showSidebar$.subscribe(value => {
      this.showSidebar = value;
    });
  }
}
