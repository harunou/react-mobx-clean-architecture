import { COUNTER_SAVE_COUNT_ENDPOINT } from '@api/counter.service';
import { RootStore } from '@stores/root/root.store';
import { autorun } from 'mobx';
import { FeatureController } from './adapter/feature.controller';
import { FeaturePresenter } from './adapter/feature.presenter';
import { MultiplyCount } from './adapter/selectors/multiply-count.selector';
import { AppState } from '@stores/app/app.types';
import { sleep } from '@testing-tools/testing-tools';
import { httpClient } from '@core/http-client';
import { PendingRequest } from '@testing-tools/testing-tools.types';

describe(`Feature functional react component`, () => {
    let store: RootStore;

    beforeEach(() => {
        const initial: AppState = {
            counter: {
                $count: 0
            }
        };
        store = RootStore.make(initial);

        MultiplyCount.runs = 0;
    });

    afterEach(() => {
        httpClient.verify();
        httpClient.clean();
    });

    // NOTE(harunou): mobx streams are behavior subjects, subscription takes
    // place in the autorun function. As well autorun triggers functional component
    // to render
    it('renders if event fires and changes the state', () => {
        const controller = FeatureController.make(store);
        const presenter = FeaturePresenter.make(store);

        const { add_1_ButtonPushed } = controller;

        let renders = 0;
        let value = 0;

        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });

        expect(value).toEqual(0);
        expect(renders).toEqual(1);

        add_1_ButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(2);

        add_1_ButtonPushed();
        expect(value).toEqual(20);
        expect(renders).toEqual(3);

        expect(MultiplyCount.runs).toEqual(3);
    });

    it('calculates selector once, even rendering two components on a page at a time', () => {
        const controller = FeatureController.make(store);
        const presenter = FeaturePresenter.make(store);

        const { add_1_ButtonPushed } = controller;

        let renders = 0;
        let value = 0;

        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });
        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });

        expect(value).toEqual(0);
        expect(renders).toEqual(2);

        add_1_ButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(4);

        add_1_ButtonPushed();
        expect(value).toEqual(20);
        expect(renders).toEqual(6);

        expect(MultiplyCount.runs).toEqual(3);
    });

    it('renders before BE response when uses optimistic save', async () => {
        const controller = FeatureController.make(store);
        const presenter = FeaturePresenter.make(store);

        const {
            add_1_andSaveOptimisticButtonPushed: add_1_and_save_optimistic_ButtonPushed
        } = controller;

        let request: PendingRequest<
            number,
            {
                count: number;
            }
        >;
        let renders = 0;
        let value = 0;

        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });
        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });

        expect(value).toEqual(0);
        expect(renders).toEqual(2);

        add_1_and_save_optimistic_ButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(4);

        request = httpClient.match<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        request.resolve(request.params.count);
        await sleep(0);

        add_1_and_save_optimistic_ButtonPushed();
        expect(value).toEqual(20);
        expect(renders).toEqual(6);

        request = httpClient.match<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        request.resolve(request.params.count);
        await sleep(0);

        expect(MultiplyCount.runs).toEqual(3);
    });

    it('renders after BE response when uses pessimistic save', async () => {
        const controller = FeatureController.make(store);
        const presenter = FeaturePresenter.make(store);

        const { add_1_andSavePessimisticButtonPushed } = controller;

        let renders = 0;
        let value = 0;

        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });
        autorun(function render() {
            const { selectMultiplyCountOn_10: selectMultiplyOn_10 } = presenter;
            renders += 1;
            value = selectMultiplyOn_10;
        });

        expect(value).toEqual(0);
        expect(renders).toEqual(2);

        add_1_andSavePessimisticButtonPushed();

        expect(value).toEqual(0);
        expect(renders).toEqual(2);

        const request0 = httpClient.match<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        request0.resolve(request0.params.count);
        await sleep(0);

        expect(value).toEqual(10);
        expect(renders).toEqual(4);

        add_1_andSavePessimisticButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(4);

        const request1 = httpClient.match<number, { count: number }>(
            COUNTER_SAVE_COUNT_ENDPOINT
        );
        request1.resolve(request1.params.count);
        await sleep(0);

        expect(value).toEqual(20);
        expect(renders).toEqual(6);

        expect(MultiplyCount.runs).toEqual(3);
    });
});
