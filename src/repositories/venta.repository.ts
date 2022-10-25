import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbServitecaDataSource} from '../datasources';
import {Venta, VentaRelations, Cliente, Servicio, Vehiculo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ServicioRepository} from './servicio.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Venta.prototype.id>;

  public readonly servicio: BelongsToAccessor<Servicio, typeof Venta.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.MongoDB_Serviteca') dataSource: MongoDbServitecaDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Venta, dataSource);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.servicio = this.createBelongsToAccessorFor('servicio', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicio', this.servicio.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
