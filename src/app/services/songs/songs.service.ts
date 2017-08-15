import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { DatabaseUrlService } from '../database-url/database-url.service';
import { EmissionService } from '../emission/emission.service';

@Injectable()
export class SongsService {

  constructor(private dbService: DatabaseService,
    private dbUrlService: DatabaseUrlService,
    private emissionService: EmissionService) { }

  getList() {
    return this.dbService.getList(this.dbUrlService.getSongsPath());
  }

  getSong(key: string) {
    return this.dbService.getObject(this.dbUrlService.getSongsPath(), key);
  }
}
