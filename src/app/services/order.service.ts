import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) {
  }

  getOrdersList(): Observable<GetResponseOrders> {
    return this.httpClient.get<GetResponseOrders>(this.baseUrl);
  }

  createOrder(data): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, data);
  }

  updateOrderStatus(id: number, data: any): Observable<any> {
    return this.httpClient.patch(`${this.baseUrl}/${id}`, data, {responseType: 'json'});
  }

  deleteOrder(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }

}


interface GetResponseOrders {
  _embedded: {
    orders: Order[];
  };
}
