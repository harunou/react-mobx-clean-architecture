# Clean Architecture for React Application with Mobx Store

The repository provides an example React application that uses the Mobx state management library. The application is implemented with [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Some Definitions

- **Business Entity**: Unit that encapsulate business rules and data.
- **Business Rules and Data**: The most general and high-level rules and data that are presentation-agnostic. They are the least likely to change when something external changes.
- **Presentation (UI) Entity**: Unit that encapsulate presentation rules and data.
- **Presentation Rules and Data**: Rules and data that represent how the UI is currently displayed.
- **Store**: An aggregate unit with set of business and/or presentation entities and/or gateways and/or other stores.
- **State**: The value of a store, which is often an object.
- **Valid State**: One of a finite number of store values that is conceptually considered valid.
- **View Model**: The state transformed into a form required for presentation in a view (e.g. a React Component).
- **Gateway**: Unit that provides external services (stateful, switches services, maps data, caches data).
- **Selector**: Unit that derive additional values from that state as needed.
- **Transaction**: Unit with a logic that transitions a store between two valid states.
- **Effect**: Unit with a logic that communicates with external systems and services through a gateway.
- **Use Case**: Unit that orchestrates the flow of data to the store with the help of effects, transactions and selectors.
- **Controller**: An adapter unit that handles input from the view and converts it into a state change with the help of use cases (the public interface consists of methods decorated with `@action`).
- **Presenter**: An adapter unit that handles the state and converts it into view models for the view with the help of selectors (the public interface consists of getters decorated with `@computed`).

## Dependency Graphs

Dependency graph of the code units.

![dependency overview](docs/images/dependency-graph-overview-0.svg)

A more detailed dependency graph can be found [here](docs/images/dependency-graph-overview-1.svg).

Dependency graph, data and control flows inside a React component

![react component](docs/images/react-component-dependencies-and-flow.png)

## Some examples of units implementations

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
