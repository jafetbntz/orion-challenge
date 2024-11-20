import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly CUSTOMERS_KEY = "CUSTOMERS";

  public _customers: ICustomer[] = [];

  constructor(private storage: LocalStorageService) { }

  private _updateStorage() {
    return this.storage.set(this.CUSTOMERS_KEY, this._customers);
  }

  public async getCustomers(): Promise<ICustomer[]> {
    const result = this.storage.get(this.CUSTOMERS_KEY) as ICustomer[];
    if (!result) {
      return [];
    }

    return result;
  }



  public async save(newCustomer: ICustomer): Promise<{ success: boolean, id?: number }> {
    newCustomer.name = `${newCustomer.firstName} ${newCustomer.lastName}`;
    newCustomer.id = await this.getNextId();
    console.log("🚀 ~ CustomersService ~ save ~ newCustomer:", newCustomer);
    
    this._customers.push(newCustomer);
    this._updateStorage();

    return {
      success: true, id: newCustomer.id
    }
  }

  public async getNextId(): Promise<number> {
    this._customers = await this.getCustomers();
    const ids = this._customers
      .map(c => c.id)
      .sort((a, b) => {
        return a < b ? 1 : -1;
      });

    if (ids.length == 0) {
      return 1;
    }

    const lastID = ids[0];
    return lastID + 1;
  }

  public async getById(_customerId: number): Promise<ICustomer | null> {
    this._customers = await this.getCustomers();


    const result = this._customers.filter(c => {
      return c.id == _customerId;
    });

    return result.length == 0 ? null : result[0];

  }

  public async update(customer: ICustomer): Promise<{ success: boolean }> {

    customer.name = `${customer.firstName} ${customer.lastName}`;

    this._customers = await this.getCustomers();
    const idx = this._customers.map(c => c.id).indexOf(customer.id);
    if (idx == -1) {
      return {
        success: false
      };
    }

    this._customers[idx] = customer;
    this._updateStorage();

    return {
      success: true
    };

  }

  public async delete(id: any) {

    this._customers = await this.getCustomers();
    this._customers = this._customers.filter(a => {
      return a.id != id;
    });
    this._updateStorage();

    return true;


  }
}




