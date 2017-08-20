import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {_catch} from 'rxjs/operator/catch';

@Injectable()
export class DatabaseService {

  constructor(private _angularFire: AngularFireDatabase) { }

  /**
   * Crea el objeto en la base de datos y devuelve la key generada por la base de datos para el nuevo objeto
   * @param path ruta al nodo en el que queremos insertar
   * @param data objeto que queremos insertar
   * @returns {string|null}
   */
  // create(path: string, data: any): string {
  //   return this._angularFire.list(path).push(data).key;
  // }
  create(path: string, data: any): FirebaseObjectObservable<any> {
    const prueba = FirebaseObjectObservable.create(observer => {
      this._angularFire
        .list(path)
        .push(data)
        .then(obj => {         // Manejamos la promesa de la base de datos
          data.$key = obj.key; // Asignamos el key generado
          observer.next(data); // Emitimos el key resultante
        })
        .catch(err => {
          observer.error(err); // En caso de error, lo devolvemos o lo manejamos...
        });
      observer.complete();     // Damos por finalizado el observer
    });
    return prueba;
  }

  /**
   * Crea el objeto en la base de datos con un key dado por nosotros
   * @param path ruta al nodo en el que queremos insertar
   * @param key key específico creado por nosotros
   * @param data objeto que queremos insertar
   * @returns {firebase.Promise<void>}
   */
  createWithKey(path: string, key: string, data: any): firebase.Promise<void> {
    if (key) {
      return this.update(path, key, data);
    } else {
      console.log('Se debe especificar una key'); // TODO: controlar bien el error (promesa)
    }
  }

  /**
   * Obtiene un objeto concreto de la base de datos
   * @param path ruta al nodo del que queremos el objeto
   * @param key key del objeto que queremos obtener
   * @returns {FirebaseObjectObservable<any>}
   */
  getObject(path: string, key: string): FirebaseObjectObservable<any> {
    return this._angularFire.object(path + key);
  }

  /**
   * Obtiene una lista de objetos de un nodo concreto
   * @param path ruta al nodo del que queremos obtener la lista
   * @param query parámetros específicos de filtrado, orden, etc. { orderByKey: true, equalTo: "texto" } por ejemplo.
   * @returns {FirebaseListObservable<any[]>}
   */
  getList(path: string, query?: any): FirebaseListObservable<any[]> {
    return this._angularFire.list(path, {query});
  }

  /**
   * Actualiza los datos de un objeto en la base de datos
   * @param path ruta al objeto que queremos actualizar
   * @param key key del objeto que queremos actualizar
   * @param data el objeto con los datos que queremos actualizar
   * @returns {firebase.Promise<void>}
   */
  update(path: string, key: string, data: any): firebase.Promise<void> {
    return this._angularFire.object(path + key).update(data);
  }

  /**
   * Borra un objeto de la base de datos
   * @param path ruta al nodo del que queremos borrar el objeto
   * @param key key del objeto que queremos borrar
   * @returns {Observable<any>}
   */
  remove(path: string, key: string): Observable<any> {
    return Observable.create(observer => {  // TODO: Revisar bien lo que se está devolviendo, no tiene mucho sentido...
      this._angularFire.object(path + key).remove().then(data => {
        observer.next();
      }, error => {
        observer.error(error);
      });
    });
  }

  timestamp() {
    return firebase.database.ServerValue.TIMESTAMP.toString();
  }
}
