import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public serverName=environment.apiUrl;
  constructor(private http : HttpClient,private authService:AuthService){}
    private header(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

   getProductsByWholesaler(): Observable<any> { 
    return this.http.get(`${this.serverName}/api/wholesalers/products`, { headers: this.header() }); 
  }
  getProductsByConsumers():Observable<any>{
    return this.http.get(`${this.serverName}/api/consumers/products`,{headers:this.header()});
  }
  getOrderByWholesalers(id:any):Observable<any>
  {
      return this.http.get(`${this.serverName}/api/wholesalers/orders?userId=${id}`,{headers:this.header()});
  }
  getOrderConsumer(id:any):Observable<any>{
      return this.http.get(`${this.serverName}/api/consumers/orders?userId=${id}`,{headers:this.header()});
  }
  getInventoryByWholesalers(id:any):Observable<any>{
     return this.http.get(`${this.serverName}/api/wholesalers/inventories?wholesalerId=${id}`,{headers:this.header()});
  }
  getProductsByManufacturer(id:any):Observable<any>{
     return this.http.get(`${this.serverName}/api/manufacturers/products?manufacturerId=${id}`,{headers:this.header()});
  }
  placeOrder(details:any,productId:any,userId:any)
  {
     return this.http.post(`${this.serverName}/api/wholesalers/order?productId=${productId}&userId=${userId}`,details,{headers:this.header()});
  }
  consumerPlaceOrder(details:any,productId:any,userId:any):Observable<any>
  {
      return this.http.post(`${this.serverName}/api/consumers/order?productId=${productId}&userId=${userId}`,details,{headers:this.header()});
  }
  updateOrderStatus(id:any,status:any):Observable<any>{
     return this.http.put(`${this.serverName}/api/wholesalers/order/${id}?status=${status}`,null,{headers:this.header()});
  }
  addConsumerFeedBack(id:any,userId:any,details:any):Observable<any>{
    return this.http.post(`${this.serverName}/api/consumers/order/${id}/feedback?userId=${userId}`,details,{headers:this.header()});
  }
  createProduct(details:any):Observable<any>
  {
    return this.http.post(`${this.serverName}/api/manufacturers/product`,details,{headers:this.header()});
  }
  updateProduct(details:any,id:any):Observable<any>{
    return this.http.put(`${this.serverName}/api/manufacturers/product/${id}`,details,{headers:this.header()});
  }
  addInventory(details:any,productId:any):Observable<any>{
   return  this.http.post(`${this.serverName}/api/wholesalers/inventories?productId=${productId}`,details,{headers:this.header()})
  }
  updateInventory(stockQuantity:any,inventoryId:any):Observable<any>{
    return this.http.put(`${this.serverName}/api/wholesalers/inventories/${inventoryId}?stockQuantity=${stockQuantity}`,null,{headers:this.header()})
  }
  Login(details:any):Observable<any>
  {
    return this.http.post(`${this.serverName}/api/user/login`,details)
  }
  registerUser(details:any):Observable<any>{
    return this.http.post(`${this.serverName}/api/user/register`,details)
  }
  
}
