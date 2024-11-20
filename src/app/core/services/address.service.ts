import { Injectable } from '@angular/core';
import { IAddress } from '../models/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {



  _addresses: IAddress[] = [
    {id: 1, firstLine: '124 Oak St, Methuen, MA', secondLine: '', customerId: 1},
    {id: 2, firstLine: '125 Oak St, Methuen, MA', secondLine: '', customerId: 2},
    {id: 3, firstLine: '126 Oak St, Methuen, MA', secondLine: '', customerId: 3},
    {id: 4, firstLine: '127 Oak St, Methuen, MA', secondLine: '', customerId: 4},
    {id: 5, firstLine: '128 Oak St, Methuen, MA', secondLine: '', customerId: 5},
    {id: 6, firstLine: '129 Oak St, Methuen, MA', secondLine: '', customerId: 1},
    {id: 7, firstLine: '111 Oak St, Methuen, MA', secondLine: '', customerId: 3},
    {id: 8, firstLine: '112 Oak St, Methuen, MA', secondLine: '', customerId: 1},
    {id: 9, firstLine: '113 Oak St, Methuen, MA', secondLine: '', customerId: 2},
    {id: 10, firstLine: '114 Oak St, Methuen, MA', secondLine: '', customerId: 3},
    {id: 11, firstLine: '115 Oak St, Methuen, MA', secondLine: '', customerId: 1},
    {id: 12, firstLine: '116 Oak St, Methuen, MA', secondLine: '', customerId: 6},
    {id: 13, firstLine: '117 Oak St, Methuen, MA', secondLine: '', customerId: 2},
    {id: 14, firstLine: '118 Oak St, Methuen, MA', secondLine: '', customerId: 1},
    {id: 15, firstLine: '119 Oak St, Methuen, MA', secondLine: '', customerId: 9},

  ];
  constructor() { }

  public async getByCustomer(_customerId: any): Promise<IAddress[]> {
    return new Promise((resolve, reject) => {
      const result = this._addresses.filter(a => {
        return a.customerId == _customerId;
      });

      resolve(result);
    });
  }

  public delete(id: number): Promise<boolean>  {

    return new Promise((resolve, reject) => {
      this._addresses = this._addresses.filter(a => {
        return a.id != id;
      });

      resolve(true);

    });
  }
  
  public async save(newAddress: IAddress): Promise<{ success: boolean, id?: number}> {

      newAddress.id = await this.getNextId();

      this._addresses.push(newAddress);
  
      return {
        success: true, id: newAddress.id
      };

  }

  public async getNextId(): Promise<number> {
    const ids = this._addresses
      .map(a => a.id)
      .sort( (a,b) => {
        return a>b ? 1: -1;
      });
    const lastID = ids[0];
    return lastID +1;
  }


}
