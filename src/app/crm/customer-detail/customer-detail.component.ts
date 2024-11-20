import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../core/models/customer.interface';
import { CustomersService } from '../../core/services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddress } from '../../core/models/address.interface';
import { AddressService } from '../../core/services/address.service';

@Component({
  selector: 'app-customer-detail',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit {
  public customer: ICustomer = {} as ICustomer;
  public addresses: IAddress[] = [];

  private _customerId: any;

  customerForm = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    phone: new FormControl('', []),
    email: new FormControl('', [Validators.email])
  });

  constructor(
    private customerService: CustomersService,
    private addressService: AddressService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(p => {
      this._customerId = p['id'];
    })
  }
  public ngOnInit() {
    this.addressService.getByCustomer(this._customerId).then(a => {
      this.addresses = a;
    });

    this.customerService.getById(this._customerId).then( (data) => {
      if (data) {
        this.customer = data;
        console.log("🚀 ~ CustomerDetailComponent ~ this.customerService.getById ~ data:", data);

        this.customerForm.setValue({
          firstName: this._nullOREmpty(this.customer.firstName),
          lastName: this._nullOREmpty(this.customer.lastName),
          phone: this._nullOREmpty(this.customer.phone),
          email: this._nullOREmpty(this.customer.email),
        });
      }
    }); 

  }

  public update() {}

  public deleteAddress(id: number) {
    this.addressService.delete(id);
  }

  public newAddress() {}

  private _nullOREmpty(value: string | undefined): string  {
    console.log("🚀 ~ CustomerDetailComponent ~ _nullOREmpty ~ value:", value);
    
    if (!value) {
      return "";
    }

    return value;
  }




}
