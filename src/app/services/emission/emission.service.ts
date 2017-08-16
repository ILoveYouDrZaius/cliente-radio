import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { DatabaseUrlService } from '../database-url/database-url.service';

@Injectable()
export class EmissionService {

  constructor(private dbService: DatabaseService,
    private dbUrlService: DatabaseUrlService) { }
  private activeSongKey: string;

  getActiveEmission() {
    return this.dbService.getList(this.dbUrlService.getActiveEmissionPath(), {
      orderByChild: 'playing',
      equalTo: true,
    });
  }

  getNominatedEmissions() {
    return this.dbService.getList(this.dbUrlService.getActiveEmissionPath(), {
      orderByChild: 'nominated',
      equalTo: true,
    });
  }
}
