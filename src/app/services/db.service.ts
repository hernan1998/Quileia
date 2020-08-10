import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private firestore: AngularFirestore) { }

  /* Operaciones de restarantes */
  getRestaurantes() {
    return this.firestore.collection('restaurantes').snapshotChanges();
  }

  createRestaurantes(data: {}) {
    return this.firestore.collection('restaurantes').add(data);
  }

  updateRestaurantes(data: {}, id: String) {
    return this.firestore.doc('restaurantes/' + id).update(data);
  }

  deleteRestaurante(restauranteId: String) {
    return this.firestore.doc('restaurantes/' + restauranteId).delete();
  }

  /* Operaciones de Menus */
  getMenus() {
    return this.firestore.collection('menus').snapshotChanges();
  }

  createMenus(data: {}) {
    return this.firestore.collection('menus').add(data);
  }

  updateMenus(data: {}, id: String) {
    return this.firestore.doc('menus/' + id).update(data);
  }

  deleteMenus(restauranteId: String) {
    return this.firestore.doc('menus/' + restauranteId).delete();
  }
}
