import { autorun } from 'mobx';
import { AppStore } from '../stores/appStore/appStore';
import { StoreFacade } from '../stores/appStore/appStore.types';
import { DomainModel } from '../stores/domainStore/domainStore.types';
import { PersistenceModel } from '../stores/persistenceStore/persistenceStore.types';
import { FeatureController } from './store/feature.controller';
import { FeaturePresenter } from './store/feature.presenter';
import { Multiply } from './store/selectors/feature.selectors';

describe(`Feature functional react component`, () => {
    let store: StoreFacade<DomainModel, PersistenceModel>;

    beforeEach(() => {
        store = AppStore.make({ $count: 0 });
        Multiply.runs = 0;
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
            const { multiplyOn_10 } = presenter;
            renders += 1;
            value = multiplyOn_10;
        });

        expect(value).toEqual(0);
        expect(renders).toEqual(1);

        add_1_ButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(2);

        add_1_ButtonPushed();
        expect(value).toEqual(20);
        expect(renders).toEqual(3);

        expect(Multiply.runs).toEqual(3);
    });

    it('calculates selector once even for two components on a page at a time', () => {
        const controller = FeatureController.make(store);
        const presenter = FeaturePresenter.make(store);

        const { add_1_ButtonPushed } = controller;

        let renders = 0;
        let value = 0;

        autorun(function render() {
            const { multiplyOn_10 } = presenter;
            renders += 1;
            value = multiplyOn_10;
        });
        autorun(function render() {
            const { multiplyOn_10 } = presenter;
            renders += 1;
            value = multiplyOn_10;
        });

        expect(value).toEqual(0);
        expect(renders).toEqual(2);

        add_1_ButtonPushed();
        expect(value).toEqual(10);
        expect(renders).toEqual(4);

        add_1_ButtonPushed();
        expect(value).toEqual(20);
        expect(renders).toEqual(6);

        expect(Multiply.runs).toEqual(3);
    });
});
