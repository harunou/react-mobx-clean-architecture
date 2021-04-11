import { CounterService } from '../../api/counter.service';
import { CounterDataSource } from '../../api/counter.types';
import { PersistenceModel } from './persistence.types';

export class PersistenceStore implements PersistenceModel {
    static make(): PersistenceStore {
        const counterService = CounterService.make();
        return new PersistenceStore(counterService);
    }
    constructor(public counterDataSource: CounterDataSource) {}
}
