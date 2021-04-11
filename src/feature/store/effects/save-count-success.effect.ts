import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CounterService } from '../../../api/counter.service';
import { PersistenceModel } from '../../../stores/persistence/persistence.types';

export class SaveCountSuccessEffect {
    static flow: CancellablePromise<number>;
    static make(persistence: PersistenceModel): SaveCountSuccessEffect {
        return new SaveCountSuccessEffect(persistence.countService);
    }

    constructor(private countService: CounterService) {}

    save(count: number): CancellablePromise<number> {
        if (SaveCountSuccessEffect.flow) {
            SaveCountSuccessEffect.flow.cancel();
        }
        SaveCountSuccessEffect.flow = flow(this.saveGenerator.bind(this))(
            count
        );
        return SaveCountSuccessEffect.flow;
    }

    private *saveGenerator(
        count: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.countService.saveSuccess(count);
        return countDto;
    }
}
