import { CountService } from '../../api/count.service';
import { Persistence } from './persistenceStore.types';

export class PersistenceStore implements Persistence {
    static make(): PersistenceStore {
        const countService = CountService.make();
        return new PersistenceStore(countService);
    }
    constructor(public countService: CountService) {}
}
