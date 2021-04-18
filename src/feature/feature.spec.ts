import { CounterService } from '@api/counter.service';
import { RootStore } from '@stores/root/root.store';
import { autorun } from 'mobx';
import { sleep } from '@testing-tools';
import { FeatureController } from './adapter/feature.controller';
import { FeaturePresenter } from './adapter/feature.presenter';
import { MultiplyCount } from './adapter/selectors/multiply-count.selector';
import { AppState } from '@stores/app/app.types';

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
        CounterService.successResponses = 0;
    });

    // NOTE(harunou): mobx streams are behavior subjects, subscription takes
    // place in the autorun function. As well autorun triggers functional component
    // to render
    it('renders if event fires and changes the state ', () => {
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

        const { add_1_and_save_optimistic_ButtonPushed } = controller;

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
        await sleep(0);

        add_1_and_save_optimistic_ButtonPushed();
        expect(value).toEqual(20);
        expect(renders).toEqual(6);
        await sleep(0);

        expect(MultiplyCount.runs).toEqual(3);
        expect(CounterService.successResponses).toEqual(2);
    });

    it('renders after BE response when uses pessimistic save', async () => {
        const controller = FeatureController.make(store);
        const presenter = FeaturePresenter.make(store);

        const { add_1_and_save_pessimistic_ButtonPushed } = controller;

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

        add_1_and_save_pessimistic_ButtonPushed();
        expect(value).toEqual(0);
        expect(renders).toEqual(2);
        await sleep(0);
        expect(value).toEqual(10);
        expect(renders).toEqual(4);

        add_1_and_save_pessimistic_ButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(4);
        await sleep(0);
        expect(value).toEqual(20);
        expect(renders).toEqual(6);

        expect(MultiplyCount.runs).toEqual(3);
        expect(CounterService.successResponses).toEqual(2);
    });
});
