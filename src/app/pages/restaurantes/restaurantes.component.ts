import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  /* Variables */
  restaurantes = [];
  New: boolean; // Variable para determinar si se esta creando nuevo restaurante o modificando 
  auxid: String; // Variable auxiliar id para modificar un restaurante

  constructor(private db: DbService) { }

  ngOnInit(): void {

    /* Obtener datos de los restaurantes */
    this.db.getRestaurantes().subscribe((data) => {
      this.restaurantes = [];
      data.map((e) => {
        this.restaurantes.push({
          id: e.payload.doc.id,
          nombre: e.payload.doc.data()['nombre'],
          razon: e.payload.doc.data()['razon'],
          ciudad: e.payload.doc.data()['ciudad'],
          apertura: e.payload.doc.data()['apertura'],
          cierre: e.payload.doc.data()['cierre'],
          tipo: e.payload.doc.data()['tipo'],
        })
      })
    });
  }

  /* Funcion para agregar restaurantes a la base de datos */
  addRestaurante() {
    var nombre = $('#nombre').val().toString();
    var razon = $('#razon').val().toString();
    var ciudad = $('#ciudad').val().toString();
    var apertura = $('#apertura').val().toString();
    var cierre = $('#cierre').val().toString();
    var tipo: number = +$('#tipo').val();
    if (this.New) {
      /* Para crear un nuevo restaurante */
      this.db.createRestaurantes({
        nombre: nombre,
        razon: razon,
        ciudad: ciudad,
        apertura: apertura,
        cierre: cierre,
        tipo: tipo,
      });
    } else {
      /* Paara modificar un restaurante ya creado */
      this.db.updateRestaurantes({
        nombre: nombre,
        razon: razon,
        ciudad: ciudad,
        apertura: apertura,
        cierre: cierre,
        tipo: tipo,
      }, this.auxid)
    }

  }

  /* Eliminar Restaurante */
  removeRestaurante() {
    this.db.deleteRestaurante(this.auxid);
  }

  /* Funciones al abrir modal */
  openModal(id: String) {
    this.New = false;
    this.auxid = id;
    var found = this.restaurantes.find(element => element.id == id);
    $('#nombre').val(found.nombre);
    $('#razon').val(found.razon);
    $('#ciudad').val(found.ciudad);
    $('#apertura').val(found.apertura);
    $('#cierre').val(found.cierre);
    $('#tipo').val(found.tipo);
    $('#titulo').text('Modificar Restaurante');
  }
  openModalnew() {
    this.New = true;
    $('#nombre').val("");
    $('#razon').val("");
    $('#ciudad').val("");
    $('#apertura').val("");
    $('#cierre').val("");
    $('#tipo').val("");
    $('#titulo').text('Nuevo Restaurante');
  }
}
