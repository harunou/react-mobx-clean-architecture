import { COUNTER_REMOTE_SERVICE } from '@api/counter.service';
import { inject, injectable } from 'tsyringe';
import { CounterSource } from './counter-source.types';
import { PersistenceModel } from './persistence.types';

@injectable()
export class PersistenceStore implements PersistenceModel {
    constructor(
        @inject(COUNTER_REMOTE_SERVICE)
        public counterRemoteService: CounterSource
    ) {}
}
