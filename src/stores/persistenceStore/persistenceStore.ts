import { CountService } from '../../api/count.service';
import { PersistenceModel } from './persistenceStore.types';

export class PersistenceStore implements PersistenceModel {
    static make(): PersistenceStore {
        const countService = CountService.make();
        return new PersistenceStore(countService);
    }
    constructor(public countService: CountService) {}
}
