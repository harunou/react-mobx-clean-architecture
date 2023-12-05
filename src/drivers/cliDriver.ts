import type { AbstractRootStore, AbstractRootStoreDto } from 'src/types';

export class CliDriver {
    private static instance: CliDriver | undefined;
    static make(rootStore: AbstractRootStore): CliDriver {
        if (CliDriver.instance === undefined) {
            CliDriver.instance = new CliDriver(rootStore);
        }
        window.cli = CliDriver.instance;
        return CliDriver.instance;
    }

    #rootStore: AbstractRootStore;

    constructor(rootStore: AbstractRootStore) {
        this.#rootStore = rootStore;
    }

    printRootState(): AbstractRootStoreDto {
        return this.#rootStore.dto;
    }
}
