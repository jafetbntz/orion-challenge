import { Injectable } from '@angular/core';
import { IAddress } from '../models/address.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly ADDRESS_KEY = "ADDRESS";
  private _addresses: IAddress[] = [];
  
  constructor(private storage: LocalStorageService) { }


  private _updateStorage() {
    return this.storage.set(this.ADDRESS_KEY, this._addresses);
  }

  public getAddresses(): IAddress[] {

    const result =   this.storage.get(this.ADDRESS_KEY) as IAddress[];
    if (!result) {
      return [];
    }

    return result;
  }

  public async getByCustomer(_customerId: any): Promise<IAddress[]> {
    this._addresses = this.getAddresses();
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
      this._updateStorage();

      resolve(true);

    });
  }
  
  public async save(newAddress: IAddress): Promise<{ success: boolean, id?: number}> {

      newAddress.id = await this.getNextId();

      this._addresses.push(newAddress);
      this._updateStorage();

      return {
        success: true, id: newAddress.id
      };

  }

  public async getNextId(): Promise<number> {
    this._addresses = this.getAddresses();

    const ids = this._addresses
      .map(a => a.id)
      .sort( (a,b) => {
        return a<b ? 1: -1;
      });
    const lastID = ids[0];
    if (lastID) {
      return 1;
    }
    return lastID +1;
  }


}
