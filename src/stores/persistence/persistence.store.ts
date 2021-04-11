import { CounterService } from '../../api/counter.service';
import { PersistenceModel } from './persistence.types';

export class PersistenceStore implements PersistenceModel {
    static make(): PersistenceStore {
        const countService = CounterService.make();
        return new PersistenceStore(countService);
    }
    constructor(public countService: CounterService) {}
}
