import { CounterService } from '../../api/counter.service';
import { CounterSource } from './counter-source.types';
import { PersistenceModel } from './persistence.types';

export class PersistenceStore implements PersistenceModel {
    static make(): PersistenceStore {
        const counterService = CounterService.make();
        return new PersistenceStore(counterService);
    }
    constructor(public counterService: CounterSource) {}
}
