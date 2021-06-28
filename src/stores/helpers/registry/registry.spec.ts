import { DependencyContainer, Lifecycle } from 'tsyringe';
import { Registration, Registry } from './registry';

describe(`${Registry.name}`, () => {
    it('uses static make method to construct', () => {
        const registry = Registry.make();
        expect(registry).toBeInstanceOf(Registry);
    });

    it('adds registration data to the registrations array property', () => {
        const registration0 = { token: 'token0', useValue: 0 };
        const registered0: Registration<number> = {
            options: { lifecycle: Lifecycle.Transient },
            token: 'token0',
            provider: { useValue: 0 }
        };
        const registration1 = { token: 'token1', useValue: 1 };
        const registered1: Registration<number> = {
            options: { lifecycle: Lifecycle.Transient },
            token: 'token1',
            provider: { useValue: 1 }
        };
        const registry = Registry.make().add(registration0).add(registration1);
        expect(registry.registrations).toEqual([registered0, registered1]);
    });

    it('adds singleton', () => {
        class S {}
        const registry = Registry.make().addSingleton(S);
        const registered: Registration<S> = {
            options: { lifecycle: Lifecycle.Singleton },
            token: S,
            provider: { useClass: S }
        };
        expect(registry.registrations).toEqual([registered]);
    });

    it('adds transient', () => {
        class S {}
        const registry = Registry.make().addTransient(S);
        const registered: Registration<S> = {
            options: { lifecycle: Lifecycle.Transient },
            token: S,
            provider: { useClass: S }
        };
        expect(registry.registrations).toEqual([registered]);
    });

    it('adds selector as transient', () => {
        class S {}
        const registry = Registry.make().addSelector(S);
        const registered: Registration<S> = {
            options: { lifecycle: Lifecycle.Transient },
            token: S,
            provider: { useClass: S }
        };
        expect(registry.registrations).toEqual([registered]);
    });

    it('adds useCase as transient', () => {
        class S {}
        const registry = Registry.make().addUseCase(S);
        const registered: Registration<S> = {
            options: { lifecycle: Lifecycle.Transient },
            token: S,
            provider: { useClass: S }
        };
        expect(registry.registrations).toEqual([registered]);
    });

    it('adds effect as singleton', () => {
        class S {}
        const registry = Registry.make().addEffect(S);
        const registered: Registration<S> = {
            options: { lifecycle: Lifecycle.Singleton },
            token: S,
            provider: { useClass: S }
        };
        expect(registry.registrations).toEqual([registered]);
    });

    it('adds adapter as singleton', () => {
        class S {}
        const registry = Registry.make().addAdapter(S);
        const registered: Registration<S> = {
            options: { lifecycle: Lifecycle.Singleton },
            token: S,
            provider: { useClass: S }
        };
        expect(registry.registrations).toEqual([registered]);
    });

    it('adds alias data to the aliases array property', () => {
        class A {}
        class B {}
        class C {}

        const registry = Registry.make().addAlias(A, C).addAlias(B, C);
        expect(registry.aliases).toEqual([
            [A, C],
            [B, C]
        ]);
    });

    it('merges another registry', () => {
        class A {}
        class B {}
        class C {}
        class D {}

        const registration0 = { token: 'token0', useValue: 0 };
        const registered0: Registration<number> = {
            options: { lifecycle: Lifecycle.Transient },
            token: 'token0',
            provider: { useValue: 0 }
        };
        const registration1 = { token: 'token1', useValue: 1 };
        const registered1: Registration<number> = {
            options: { lifecycle: Lifecycle.Transient },
            token: 'token1',
            provider: { useValue: 1 }
        };

        const registry0 = Registry.make().add(registration0).addAlias(A, B);
        const registry1 = Registry.make().add(registration1).addAlias(C, D);

        registry0.merge(registry1);

        expect(registry0.registrations).toEqual([registered0, registered1]);
        expect(registry0.aliases).toEqual([
            [A, B],
            [C, D]
        ]);
    });

    it('forwards registrations to dependency container', () => {
        class A {}
        class B {}
        class C {}

        const registration0 = { token: 'token0', useValue: 0 };
        const registration1 = { token: 'token1', useValue: 1 };

        const registry = Registry.make()
            .add(registration0)
            .add(registration1)
            .addAlias(A, B)
            .addAlias(A, C);

        const container: DependencyContainer = ({
            register: jest.fn()
        } as unknown) as DependencyContainer;

        registry.forwardTo(container);

        expect(container.register).toHaveBeenCalledTimes(4);
        expect(container.register).toHaveBeenNthCalledWith(
            1,
            'token0',
            { useValue: 0 },
            { lifecycle: Lifecycle.Transient }
        );
        expect(container.register).toHaveBeenNthCalledWith(
            2,
            'token1',
            { useValue: 1 },
            { lifecycle: Lifecycle.Transient }
        );
        expect(container.register).toHaveBeenNthCalledWith(3, A, {
            useToken: B
        });
        expect(container.register).toHaveBeenNthCalledWith(4, A, {
            useToken: C
        });
    });
});
