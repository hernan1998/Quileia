import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  /* Variables */
  menus = [];
  ingredientes = [];
  calorias: number = 0;
  New: boolean; // Variable para determinar si se esta creando nuevo menu o modificando 
  auxid: String; // Variable auxiliar id para modificar un menu

  constructor(private db: DbService) { }

  ngOnInit(): void {

    this.db.getMenus().subscribe((data) => {
      this.menus = [];
      data.map((e) => {
        this.menus.push({
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          precio: e.payload.doc.data()['precio'],
          tipo: e.payload.doc.data()['tipo'],
          ingredientes: e.payload.doc.data()['ingredientes'],
        })
      })
    });
  }

  /* Funcion agregar menus */
  addMenu() {
    var nombre = $('#nombre').val().toString();
    var price = $('#precio').val().toString();
    var precio = parseFloat(price);
    var tipo = $('#tipo').val().toString();
    var ing = this.ingredientes;
    if (this.New) {
      /* Para crear un nuevo restaurante */
      this.db.createMenus({
        nombre: nombre,
        precio: precio,
        tipo: tipo,
        ingredientes: ing,
      });
    } else {
      /* Paara modificar un restaurante ya creado */
      this.db.updateMenus({
        nombre: nombre,
        precio: precio,
        tipo: tipo,
        ingredientes: ing,
      }, this.auxid)
    }
  }

  /* Funcion agregar ingredientes al menu */
  addIngrediente() {
    var nombre = $('#ingrediente').val().toString();
    var caloria = +$('#caloria').val();
    this.calorias = this.calorias + caloria;
    this.ingredientes.push({ nombre, caloria })
    console.log(this.ingredientes, this.calorias)
  }

  /* Funcion para eliminar menu */
  removeMenu() {
    this.db.deleteMenus(this.auxid);
  }

  /* Funciones al abrir modal */
  openModal(id: String) {
    this.New = false;
    this.auxid = id;
    var found = this.menus.find(element => element.id == id);
    this.ingredientes = found.ingredientes;
    $('#nombre').val(found.nombre);
    $('#tipo').val(found.tipo);
    $('#precio').val(found.precio);
    $('#titulo').text('Modificar Menu');
  }
  openModalnew() {
    this.New = true;
    this.ingredientes = [];
    $('#nombre').val("");
    $('#tipo').val("");
    $('#precio').val("");
    $('#ingrediente').val("");
    $('#caloria').val("");
    $('#titulo').text('Nuevo Menu');
  }

}
