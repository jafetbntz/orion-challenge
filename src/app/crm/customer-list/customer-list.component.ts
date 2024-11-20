import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../core/services/customers.service';

@Component({
  selector: 'app-customer-list',
  imports: [FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  public search: string = "";

  public get customers() {
    if (this.search) {
      return this.customerService.customers.filter(f => {
        const txt = this.search.toLocaleLowerCase().trim();
        return f.name.toLocaleLowerCase().indexOf(txt) != -1;
      })
    }
    return this.customerService.customers;
  }

  constructor(
    private router: Router,
    private customerService: CustomersService
  ) {

  }

  public goToDetail(id: number) {
    this.router.navigate(["/customers/", id]);
  }

  public goToForm() {
    this.router.navigate(["/customers/new"]);

  }

}
