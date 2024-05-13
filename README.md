# Clean Architecture Implementation for React Application with Mobx Store

The repository provides an example React application that uses Mobx state management library with [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) applied.

## Benefits

1. Independent and reusable code units with separated concerns.
2. Unified control and data flow.
3. Testable code.
4. Reduced cognitive overload when working with a codebase.

## Definitions

- **Business Entity**: Unit that encapsulates business rules and data.
- **Business Rules and Data**: The most general and high-level rules and data that are presentation-agnostic. They are the least likely to change when something external changes.
- **Presentation (UI) Entity**: Unit that encapsulates presentation rules and data.
- **Presentation Rules and Data**: Rules and data that represent how the UI is currently displayed.
- **Store**: An aggregate unit with set of business and/or presentation entities and/or gateways and/or other stores.
- **State**: The value of a store, which is often an object.
- **Valid State**: One of a finite number of store values that is conceptually considered valid.
- **View Model**: The state transformed into a form required for presentation in a view (e.g. a React Component).
- **Gateway**: Unit that provides external services (stateful, switches services, maps data, caches data).
- **Selector**: Unit that derives additional values from the state as needed.
- **Transaction**: Unit with a logic that transitions a store between two valid states.
- **Effect**: Unit with a logic that communicates with external systems and services through a gateway.
- **Use Case**: Unit that orchestrates the flow of data with the help of effects, transactions and selectors.
- **Controller**: An adapter unit that handles input from the view and converts it into a state change with the help of use cases (the public interface consists of methods decorated with `@action`).
- **Presenter**: An adapter unit that handles the state and converts it into view models for the view with the help of selectors (the public interface consists of getters decorated with `@computed`).

## Dependency Graphs

Dependency graph of the code units.

![dependency overview](docs/images/dependency-graph-overview-0.svg)

Detailed dependency graph can be found [here](docs/images/dependency-graph-overview-1.svg).

Dependency, data and events flow inside a React component

![react component](docs/images/react-component-dependencies-and-flow.png)

Architecture diagram

![uml](docs/images/fe-ca-diagram.png)

## Examples of Units Implementation and Specs

- [OrderItemModel](src/modules/orders/models/OrderItemModel/OrderItemModel.spec.ts)
- [DeleteOrderTransactions](src/modules/orders/transactions/DeleteOrderTransactions/DeleteOrderTransactions.spec.ts)
- [TotalOrderItemQuantitySelectorOptimized](src/modules/orders/selectors/TotalOrderItemQuantitySelector/TotalOrderItemQuantitySelectorOptimized.spec.tsx)
- [TotalOrderItemQuantitySelector](src/modules/orders/selectors/TotalOrderItemQuantitySelector/TotalOrderItemQuantitySelector.spec.ts)
- [TotalOrderItemQuantitySelectorNotOptimized](src/modules/orders/selectors/TotalOrderItemQuantitySelector/TotalOrderItemQuantitySelectorNotOptimized.spec.tsx)
- [DeleteOrderUseCase](src/modules/orders/useCases/DeleteOrderUseCase/DeleteOrderUseCase.spec.ts)
- [DeleteOrderUseCaseWithInnerUnits](src/modules/orders/useCases/DeleteOrderUseCase/DeleteOrderUseCaseWithInnerUnits.spec.ts)
- [DeleteOrderUseCaseWithExtractedUnits](src/modules/orders/useCases/DeleteOrderUseCase/DeleteOrderUseCaseWithExtractedUnits.spec.ts)
- [DeleteItemByIdUseCase](src/modules/orders/useCases/DeleteItemByIdUseCase/DeleteItemByIdUseCase.spec.ts)
- [DestroyModuleUseCase](src/modules/orders/useCases/DestroyModuleUseCase/DestroyModuleUseCase.spec.ts)
- [OrderItem](src/modules/orders/views/containers/OrderItem/OrderItem.spec.tsx)
- [OrderItemWithNullAdapter](src/modules/orders/views/containers/OrderItem/OrderItemWithNullAdapter/OrderItem.spec.tsx)
- [OrderItemWithOnlyDefinedAdapterInterface](src/modules/orders/views/containers/OrderItem/OrderItemWithOnlyDefinedAdapterInterface/OrderItem.spec.tsx)
- [OrderItemWithCombinedAdapter](src/modules/orders/views/containers/OrderItem/OrderItemWithCombinedAdapter/OrderItem.spec.tsx)
- [OrderItemWithSplitAdapter](src/modules/orders/views/containers/OrderItem/OrderItemWithSplitAdapter/OrderItem.spec.tsx)
- [OrderItemWithSplitExtractedAdapter](src/modules/orders/views/containers/OrderItem/OrderItemWithSplitExtractedAdapter/OrderItem.spec.tsx)
- [OrderItemWithCombinedPropsObservableState](src/modules/orders/views/containers/OrderItem/OrderItemWithCombinedPropsObservableState/OrderItem.spec.tsx)
- [OrderItemWithUseCase](src/modules/orders/views/containers/OrderItem/OrderItemWithUseCase/OrderItem.spec.tsx)
- [OrderItemWithSelector](src/modules/orders/views/containers/OrderItem/OrderItemWithSelector/OrderItem.spec.tsx)
- [OrderItemController](src/modules/orders/views/containers/OrderItem/OrderItemWithSplitExtractedAdapter/OrderItemAdapter/OrderItemController.spec.ts)
- [Orders](src/modules/orders/views/containers/Orders/Orders.spec.tsx)
- [DeleteOrderEffect](src/modules/orders/effects/DeleteOrderEffect/DeleteOrderEffect.spec.ts)
- [HybridOrdersGateway](src/modules/orders/gateways/HybridOrdersGateway/HybridOrdersGateway.spec.ts)
- [LocalOrdersGateway](src/modules/orders/gateways/HybridOrdersGateway/LocalOrdersGateway/LocalOrdersGateway.spec.ts)

## Units Lifecycle

For the units implementation, it is suggested to use Cluster Lifecycle model described in this [article](docs/the-new-culture-of-software-development-reflection.pdf), where generalization is important and mandatory step.

## File Structure of Orders Module

```console
./src/modules/orders
├── api
│   ├── api.types.ts
│   ├── httpClient
│   │   └── httpClient.ts
│   ├── OrdersApi
│   │   ├── OrdersApi.factory.ts
│   │   ├── OrdersApi.ts
│   │   └── OrdersApi.types.ts
│   └── ServiceApi
│       ├── ServiceApi.ts
│       └── ServiceApi.types.ts
├── contexts
│   └── OrdersStoreContext.ts
├── drivers
│   └── OrdersDriver.ts
├── effects
│   └── DeleteOrderEffect
│       └── DeleteOrderEffect.ts
├── gateways
│   ├── HybridOrdersGateway
│   │   ├── HybridOrdersGateway.ts
│   │   ├── LocalOrdersGateway
│   │   │   └── LocalOrdersGateway.ts
│   │   └── RemoteOrdersGateway
│   │       ├── RemoteOrdersGateway.ts
│   │       ├── RemoteOrdersGateway.types.ts
│   │       └── RemoteOrdersGateway.utils.ts
│   └── RemoteServiceGateway
│       ├── RemoteServiceGatewayStub.ts
│       └── RemoteServiceGateway.ts
├── models
│   ├── OrderItemModel
│   │   ├── OrderItemModelCollection.ts
│   │   ├── OrderItemModel.factory.ts
│   │   └── OrderItemModel.ts
│   ├── OrderModel
│   │   ├── OrderModelCollection.ts
│   │   ├── OrderModel.factory.ts
│   │   └── OrderModel.ts
│   ├── OrdersCancelEffects.ts
│   └── OrdersPresentationModel
│       ├── OrdersPresentationModel.factory.ts
│       └── OrdersPresentationModel.ts
├── selectors
│   ├── ItemByIdSelector
│   │   └── ItemByIdSelector.ts
│   ├── OrderByIdSelector
│   │   └── OrderByIdSelector.ts
│   └── TotalOrderItemQuantitySelector
│       ├── TotalOrderItemQuantitySelectorNotOptimized.ts
│       ├── TotalOrderItemQuantitySelectorOptimized.ts
│       └── TotalOrderItemQuantitySelectorSingleton.ts
├── stores
│   ├── OrdersStore.factory.ts
│   └── OrdersStore.ts
├── transactions
│   └── DeleteOrderTransactions
│       └── DeleteOrderTransactions.ts
├── types
│   ├── aggregates
│   │   └── OrdersAggregate.ts
│   ├── entities
│   │   ├── OrderEntity
│   │   │   ├── OrderEntityCollection.ts
│   │   │   └── OrderEntity.ts
│   │   ├── OrderItemEntity
│   │   │   ├── OrderItemEntityCollection.ts
│   │   │   └── OrderItemEntity.ts
│   │   └── OrdersPresentationEntity.ts
│   ├── gateways
│   │   ├── OrdersGateway.ts
│   │   └── ServiceGateway.ts
│   └── OrdersCancelEffectCollection.ts
├── useCases
│   ├── DeleteItemByIdUseCase
│   │   ├── DeleteItemByIdUseCaseFactored.ts
│   │   └── DeleteItemByIdUseCasePlain.ts
│   ├── DeleteOrderUseCase
│   │   ├── DeleteOrderUseCaseWithExtractedUnits.ts
│   │   └── DeleteOrderUseCaseWithInnerUnits.ts
│   ├── DestroyModuleUseCase
│   │   └── DestroyModuleUseCase.ts
│   ├── LoadOrdersUseCase
│   │   └── LoadOrdersUseCase.ts
│   ├── PollingOrdersUseCase
│   │   └── PollingOrdersUseCase.ts
│   └── UpdateOrderUseCase
│       └── UpdateOrderUseCase.ts
└── views
    └── containers
        ├── Order
        │   ├── OrderAdapter
        │   │   ├── OrderController.ts
        │   │   └── OrderPresenter.ts
        │   └── Order.tsx
        ├── OrderItem
        │   ├── OrderItemWithCombinedAdapter
        │   │   └── OrderItem.tsx
        │   ├── OrderItemWithCombinedPropsObservableState
        │   │   ├── OrderItemAdapter
        │   │   │   ├── OrderItemController.ts
        │   │   │   └── OrderItemPresenter.ts
        │   │   └── OrderItem.tsx
        │   ├── OrderItemWithNullAdapter
        │   │   └── OrderItem.tsx
        │   ├── OrderItemWithOnlyDefinedAdapterInterface
        │   │   ├── OrderItem.tsx
        │   │   └── OrderItem.types.tsx
        │   ├── OrderItemWithSelector
        │   │   ├── OrderItemAdapter
        │   │   │   ├── OrderItemController.ts
        │   │   │   ├── OrderItemPresenterWithExtractedSelector.ts
        │   │   │   └── OrderItemPresenterWithInnerSelector.ts
        │   │   └── OrderItem.tsx
        │   ├── OrderItemWithSplitAdapter
        │   │   └── OrderItem.tsx
        │   ├── OrderItemWithSplitExtractedAdapter
        │   │   ├── OrderItemAdapter
        │   │   │   ├── OrderItemController.ts
        │   │   │   └── OrderItemPresenter.ts
        │   │   └── OrderItem.tsx
        │   └── OrderItemWithUseCase
        │       ├── OrderItemAdapter
        │       │   ├── OrderItemControllerWithExtractedUseCase.ts
        │       │   ├── OrderItemControllerWithInnerUseCase.ts
        │       │   └── OrderItemPresenter.ts
        │       └── OrderItem.tsx
        └── Orders
            ├── Orders.tsx
            └── Orders.utils.ts
```
