import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../core/services/customers.service';
import { ICustomer } from '../../core/models/customer.interface';

@Component({
  selector: 'app-customer-list',
  imports: [FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  public search: string = "";

  public _customers: ICustomer[] = [];

  public get customers() {
    if (this.search) {
      return this._customers.filter(f => {
        const txt = this.search.toLocaleLowerCase().trim();
        return f.name.toLocaleLowerCase().indexOf(txt) != -1;
      })
    }
    return this._customers;
  }

  constructor(
    private router: Router,
    private customerService: CustomersService
  ) {

  }
  ngAfterViewInit(): void {
    this.customerService.getCustomers().then(c => {
      this._customers = c;
    })
  }

  public goToDetail(id: number) {
    this.router.navigate(["/customers/", id]);
  }

  public goToForm() {
    this.router.navigate(["/customers/new"]);

  }

}
