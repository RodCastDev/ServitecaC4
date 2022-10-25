import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbServitecaDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Servicio, Venta} from '../models';
import {ServicioRepository} from './servicio.repository';
import {VentaRepository} from './venta.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly servicios: HasManyRepositoryFactory<Servicio, typeof Vehiculo.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Venta, typeof Vehiculo.prototype.id>;

  constructor(
    @inject('datasources.MongoDB_Serviteca') dataSource: MongoDbServitecaDataSource, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventaRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.servicios = this.createHasManyRepositoryFactoryFor('servicios', servicioRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
