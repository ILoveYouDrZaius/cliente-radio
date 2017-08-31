import { Injectable } from '@angular/core';

const SEPARATOR = '/';
const DATABASE_ROOT_URL = 'database';
const USERS_URL  = 'users';
const ADMIN_USERS_URL  = 'admin-users';
const ACTIVE_EMISSION_URL = 'active-emission';
const ALBUMS_URL = 'albums';
const ARTISTS_URL = 'artists';
const EMISSIONS_URL = 'emissions';
const MESSAGES_URL = 'messages';
const SONGS_URL = 'songs';


@Injectable()
export class DatabaseUrlService {

  constructor() { }

  getUsersPath() {
    return DATABASE_ROOT_URL + SEPARATOR + USERS_URL + SEPARATOR;
  }

  getAdminUsersPath() {
    return DATABASE_ROOT_URL + SEPARATOR + USERS_URL + SEPARATOR;
  }

  getActiveEmissionPath() {
    return DATABASE_ROOT_URL + SEPARATOR + ACTIVE_EMISSION_URL + SEPARATOR;
  }

  getAlbumsPath() {
    return DATABASE_ROOT_URL + SEPARATOR + ALBUMS_URL + SEPARATOR;
  }

  getArtistsPath() {
    return DATABASE_ROOT_URL + SEPARATOR + ARTISTS_URL + SEPARATOR;
  }

  getEmissionsPath() {
    return DATABASE_ROOT_URL + SEPARATOR + EMISSIONS_URL + SEPARATOR;
  }

  getMessagesPath() {
    return DATABASE_ROOT_URL + SEPARATOR + MESSAGES_URL + SEPARATOR;
  }
  getSongsPath() {
    return DATABASE_ROOT_URL + SEPARATOR + SONGS_URL + SEPARATOR;
  }
}
