# Clean Architecture Implementation for React Application with Mobx Store

This repository demonstrates a [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
implementation in a React application using Mobx state management library.

By applying Clean Architecture principles, this project maintains structural
integrity, remains straightforward and 💡 easy to understand. The project
demonstrates that implementing Clean Architecture in frontend applications
doesn't have to result in unnecessary 🤯 complexity or overengineering.

## Benefits

1. Limited context and low cognitive load, when working with a codebase.
2. Independent, reusable and portable code units with separated concerns.
3. Unified control and data flow throughout the application.
4. Testable code with clear boundaries for unit and integration tests, where
   tests are inline application specifications.

Apart from human developers, these benefits apply well to AI assistants, helping
reduce code entropy through multiple repeated iterations.

## Clean Architecture Implementation

The diagram below represents a basic implementation of Clean Architecture for a
typical frontend application with a store and API integration. The
implementation can be used with any modern reactive frontend framework, like
React, Vue, Svelte, or Angular.

![basic-clean-architecture-implementation](docs/images/fe-ca-diagram.svg)

The next diagram represents an extended implementation of Clean Architecture for
a typical frontend application. The diagram shows additional units into which an
application can be factored.

![advanced-clean-architecture-implementation](docs/images/fe-ca-diagram-extended.svg)

> NOTE: the double lines on both diagrams are representing the boundaries
> between the units. Typically the data that crosses the boundaries is simple
> data structures, for example Data Transfer Objects (DTOs) or plain objects.

## Definition of units

- **Enterprise Business Entity (EB Entity)**: Unit that encapsulates enterprise
  business rules and data.
- **Application Business Entity (AB Entity)**: Unit that encapsulates
  application-specific business rules and data.
- **Entities Store**: An aggregate unit that maintains a collection of enterprise
  business entities and/or application business entities and their states.
- **Use Case Interactor**: Unit that orchestrates the flow of data in the
  application by coordinating entities, gateways, and transactions to fulfill
  specific user goals, implements application business rules.
- **Transaction**: Unit with logic that transitions a store between two valid
  states, ensuring business rules are maintained.
- **Selector**: Unit that derives values or data structures from the state
  without modifying it, implementing read-only queries against the state,
  implements application business rules.
- **Gateway**: Unit that isolates external resources by providing interfaces for
  data access, mapping data from external resources into entities, and potentially
  caching data.
- **Effect**: Unit that is responsible for encapsulating logic that interacts with
  external resources through gateways, managing side effects, and handling
  asynchronous operations.
- **Controller**: Unit that handles input data from the view and converts it
  into use case invocations.
- **Presenter**: Unit that transforms the application state into output data
  suitable for the view, often using selectors.
- **View**: Unit that is responsible for displaying information to the user
  based on the data prepared by the presenter and for capturing user input and
  transferring it to the controller.
- **External Resource**: External systems or services that the application
  interacts with, such as APIs, databases, storages, or other applications.

## Definition of concepts utilized by the units

- **Enterprise Business Rules and Data**: The most general and high-level rules
  and data that would exist even if the application didn't. These are
  enterprise-wide rules that rarely change and are independent of any specific
  application.
- **Application Business Rules and Data**: Rules and data specific to the
  application's functionality and presentation. This includes how business
  concepts are presented to users, interaction flows, UI state management, and
  application-specific behaviors. These are more likely to change compared to
  enterprise rules.
- **State**: The value of a store at a given point in time, typically
  represented as an object structure.
- **Valid State**: One of a finite number of store values that is conceptually
  considered valid according to business and application rules.

## Dependency Graphs

Dependency graph of the code units.

![dependency overview](docs/images/dependency-graph-overview-0.svg)

Detailed dependency graph can be found [here](docs/images/dependency-graph-overview-1.svg).

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
