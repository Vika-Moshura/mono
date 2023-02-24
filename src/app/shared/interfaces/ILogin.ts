export interface ILogin {
    email:string,
    password:string,
    firstName:string,
    lastName: string,
    phoneNumber: string,
    role:string,
    id:number,
    address:string,
    orders:Array<any>
}

export interface ILoginRequest{
    email:string,
    password:string,
}