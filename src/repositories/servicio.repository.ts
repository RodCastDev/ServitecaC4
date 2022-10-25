import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbServitecaDataSource} from '../datasources';
import {Servicio, ServicioRelations, Vehiculo, Venta} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {VentaRepository} from './venta.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Servicio.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.MongoDB_Serviteca') dataSource: MongoDbServitecaDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Servicio, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
