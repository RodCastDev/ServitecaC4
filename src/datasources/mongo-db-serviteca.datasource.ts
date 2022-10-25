import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDB_Serviteca',
  connector: 'mongodb',
  url: 'mongodb+srv://RodrigoCastiblanco:getaccess05@clusterprogweb.q37gpai.mongodb.net/ServitecaBD?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbServitecaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDB_Serviteca';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDB_Serviteca', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
