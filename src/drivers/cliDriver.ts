import type { RootAggregate, RootAggregateDto } from 'src/types';

export class CliDriver {
    private static instance: CliDriver | undefined;
    static make(rootStore: RootAggregate): CliDriver {
        if (CliDriver.instance === undefined) {
            CliDriver.instance = new CliDriver(rootStore);
        }
        window.cli = CliDriver.instance;
        return CliDriver.instance;
    }

    #rootStore: RootAggregate;

    constructor(rootStore: RootAggregate) {
        this.#rootStore = rootStore;
    }

    printRootState(): RootAggregateDto {
        return this.#rootStore.dto;
    }
}
