import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Servicio} from './servicio.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Venta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  CodigoDeServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  CostoDelServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  DocumentoCliente: string;

  @property({
    type: 'string',
    required: true,
  })
  Placa: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaServicio: string;

  @belongsTo(() => Cliente, {name: 'cliente'})
  id_cliente: string;

  @belongsTo(() => Servicio, {name: 'servicio'})
  id_servicio: string;

  @belongsTo(() => Vehiculo, {name: 'vehiculo'})
  id_vehiculo: string;

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
