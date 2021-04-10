import { CountService } from '../../api/count.service';

export class PersistenceStore {
    static make(): PersistenceStore {
        const countService = CountService.make();
        return new PersistenceStore(countService);
    }
    constructor(public countService: CountService) {}
}
