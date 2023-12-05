import type { ApiHttpClient } from '../api.types';
import { HttpClient } from '../httpClient';
import type { OrderDto } from './OrdersApi.types';

export const ordersApiUrl = '/api/orders';

export class OrdersApi {
    static make(): OrdersApi {
        return new OrdersApi(HttpClient.make());
    }

    private ordersApiUrl = ordersApiUrl;

    constructor(private readonly httpClient: ApiHttpClient) {}

    async fetchOrders(): Promise<OrderDto[]> {
        const request = new Request(this.ordersApiUrl, {
            method: 'GET',
        });
        return this.httpClient.request<OrderDto[]>(request);
    }

    async updateOrder(order: OrderDto): Promise<OrderDto> {
        const request = new Request(`${this.ordersApiUrl}/${order.id}`, {
            method: 'PUT',
            body: JSON.stringify(order),
        });
        return this.httpClient.request<OrderDto>(request);
    }

    async deleteOrder(id: string): Promise<void> {
        const request = new Request(`${this.ordersApiUrl}/${id}`, {
            method: 'DELETE',
        });
        return this.httpClient.request(request);
    }

    async deleteItem(orderId: string, itemId: string): Promise<void> {
        const request = new Request(`${this.ordersApiUrl}/${orderId}/items/${itemId}`, {
            method: 'DELETE',
        });
        return this.httpClient.request(request);
    }
}
