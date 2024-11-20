import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  public customers: ICustomer[] = [
    { id: 1, firstName: 'Name 1', lastName: 'The Last Name', name: "Luke Skywalker"},
    { id: 2, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhon Snow"},
    { id: 3, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhonny Ventura"},
    { id: 4, firstName: 'Name 1', lastName: 'The Last Name', name: "Obiwan B. Kenobi"},
    { id: 5, firstName: 'Name 1', lastName: 'The Last Name', name: "Luke Skywalker"},
    { id: 6, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhon Snow"},
    { id: 7, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhonny Ventura"},
    { id: 8, firstName: 'Name 1', lastName: 'The Last Name', name: "Obiwan B. Kenobi"},
    { id: 9, firstName: 'Name 1', lastName: 'The Last Name', name: "Luke Skywalker"},
    { id: 10, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhon Snow"},
    { id: 11, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhonny Ventura"},
    { id: 12, firstName: 'Name 1', lastName: 'The Last Name', name: "Obiwan B. Kenobi"},
    { id: 13, firstName: 'Name 1', lastName: 'The Last Name', name: "Luke Skywalker"},
    { id: 15, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhon Snow"},
    { id: 16, firstName: 'Name 1', lastName: 'The Last Name', name: "Jhonny Ventura"},
    { id: 17, firstName: 'Name 1', lastName: 'The Last Name', name: "Obiwan B. Kenobi"}
  ];
  public async getCustomers(): Promise<ICustomer[]> {
    return new Promise((resolve, reject) => {
      resolve(this.customers);
    });
  }

  public async save(newCustomer: ICustomer): Promise<{success: boolean, id?: number}> {
    newCustomer.name = `${newCustomer.firstName} ${newCustomer.lastName}`;
    newCustomer.id = await this.getNextId();
    this.customers.push(newCustomer);

    return {
      success: true, id: newCustomer.id
    }
  }

  public async getNextId(): Promise<number> {
    const ids = this.customers
      .map(c => c.id)
      .sort( (a,b) => {
        return a>b ? 1: -1;
      });
    const lastID = ids[0];
    return lastID +1;
  }

  public async getById(_customerId: number): Promise<ICustomer  | null> {
    return new Promise((resolve, reject) => {
      const result = this.customers.filter(c => {
        return c.id == _customerId;
      });

      resolve(result.length == 0 ? null : result[0]);
    });
  }

  constructor() { }
}
