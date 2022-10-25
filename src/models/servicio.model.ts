import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Venta} from './venta.model';

@model()
export class Servicio extends Entity {
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
  NombreDeServicio: string;

  @property({
    type: 'number',
    required: true,
  })
  CostoDeServicio: number;

  @belongsTo(() => Vehiculo, {name: 'vehiculo'})
  id_vehiculo: string;

  @hasMany(() => Venta, {keyTo: 'id_servicio'})
  ventas: Venta[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
