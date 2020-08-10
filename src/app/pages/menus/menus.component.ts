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
          calorias: e.payload.doc.data()['calorias'],
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
    var tipo = +$('#tipo').val();
    var ing = this.ingredientes;
    if (this.New) {
      /* Para crear un nuevo restaurante */
      this.db.createMenus({
        nombre: nombre,
        precio: precio,
        tipo: tipo,
        ingredientes: ing,
        calorias: this.calorias,
      });
    } else {
      /* Paara modificar un restaurante ya creado */
      this.db.updateMenus({
        nombre: nombre,
        precio: precio,
        tipo: tipo,
        ingredientes: ing,
        calorias: this.calorias,
      }, this.auxid)
    }
  }

  /* Funcion agregar ingredientes al menu */
  addIngrediente() {
    var nombre = $('#ingrediente').val().toString();
    var caloria: number = +$('#caloria').val();
    if ((this.calorias + caloria) > 2000) {
      var str = "No puede exceder 2000 calorias. Actualmente: " + this.calorias;
      window.alert(str);
    } else {
      this.calorias = this.calorias + caloria;
      console.log(this.calorias)
      this.ingredientes.push({ nombre, caloria })
    }
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
    this.calorias = found.calorias;
    this.ingredientes = found.ingredientes;
    $('#nombre').val(found.nombre);
    $('#tipo').val(found.tipo);
    $('#precio').val(found.precio);
    $('#titulo').text('Modificar Menu');
  }
  openModalnew() {
    this.New = true;
    this.ingredientes = [];
    this.calorias = 0;
    $('#nombre').val("");
    $('#tipo').val("");
    $('#precio').val("");
    $('#ingrediente').val("");
    $('#caloria').val("");
    $('#titulo').text('Nuevo Menu');
  }

}
