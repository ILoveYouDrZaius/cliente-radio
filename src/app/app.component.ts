import { Component } from '@angular/core';
import { DatabaseService } from './services/database/database.service';
import { DatabaseUrlService } from './services/database-url/database-url.service';
import { EmissionService } from './services/emission/emission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DatabaseService, DatabaseUrlService, EmissionService ]
})
export class AppComponent {
  title = 'app';
  constructor(private db: DatabaseService,
    private dbUrl: DatabaseUrlService) {
  }
}
