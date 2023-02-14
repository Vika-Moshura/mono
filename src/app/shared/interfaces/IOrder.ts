export interface IOrder {
    id:number,
    date:Date,
    address:string,
    sum:number,
    status:string,
    products:[];
}
