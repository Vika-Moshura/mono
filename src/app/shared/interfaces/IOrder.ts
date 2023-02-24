import { IProductResponse } from "./IProduct";

export interface IOrderRequest {
    date:Date,
    address:string,
    sum:number,
    status:string,
    products:IProductResponse[];
}

export interface IOrderResponse extends IOrderRequest{
    id:number,
}