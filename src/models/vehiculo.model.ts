import {Entity, model, property, hasMany} from '@loopback/repository';
import {Servicio} from './servicio.model';
import {Venta} from './venta.model';

@model()
export class Vehiculo extends Entity {
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
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Color: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  Anio: string;

  @hasMany(() => Servicio, {keyTo: 'id_vehiculo'})
  servicios: Servicio[];

  @hasMany(() => Venta, {keyTo: 'id_vehiculo'})
  ventas: Venta[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
