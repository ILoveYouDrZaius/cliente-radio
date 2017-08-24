import { Component } from '@angular/core';
import { DatabaseService } from './services/database/database.service';
import { DatabaseUrlService } from './services/database-url/database-url.service';
import { EmissionService } from './services/emission/emission.service';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DatabaseService, DatabaseUrlService, EmissionService ]
})
export class AppComponent implements AfterViewInit{
  title = 'app';
  constructor(private db: DatabaseService,
    private dbUrl: DatabaseUrlService) {
  }

  ngAfterViewInit() {
    console.log('AIOJSAD')
    var element = document.getElementById("chatwindow");
    element.scrollTop = element.scrollHeight;
  }
}
