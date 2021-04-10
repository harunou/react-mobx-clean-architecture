import { flow } from 'mobx';
import { CancellablePromise } from 'mobx/dist/api/flow';
import { CountService } from '../../../api/count.service';
import { Persistence } from '../../../stores/persistenceStore/persistenceStore.types';

export class SaveCountSuccessFlow {
    static flow: CancellablePromise<number>;
    static make(persistence: Persistence): SaveCountSuccessFlow {
        return new SaveCountSuccessFlow(persistence.countService);
    }

    constructor(private countService: CountService) {}

    save(count: number): CancellablePromise<number> {
        if (SaveCountSuccessFlow.flow) {
            SaveCountSuccessFlow.flow.cancel();
        }
        SaveCountSuccessFlow.flow = flow(this.saveGenerator.bind(this))(count);
        return SaveCountSuccessFlow.flow;
    }

    private *saveGenerator(
        count: number
    ): Generator<Promise<number>, number, number> {
        const countDto = yield this.countService.saveSuccess(count);
        return countDto;
    }
}
