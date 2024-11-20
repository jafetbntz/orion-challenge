import { Component } from '@angular/core';
import { ICustomer } from '../../core/models/customer.interface';
import { CustomersService } from '../../core/services/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddress } from '../../core/models/address.interface';
import { AddressService } from '../../core/services/address.service';

@Component({
  selector: 'app-customer-detail',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent {
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(p => {
      this._customerId = p['id'];
    })
  }
  public ngAfterViewInit() {

    this.addressService.getByCustomer(this._customerId).then(a => {
      this.addresses = a;
    });

    this.customerService.getById(this._customerId).then((data) => {
      if (data) {
        this.customer = data;

        this.customerForm.setValue({
          firstName: this._nullOREmpty(this.customer.firstName),
          lastName: this._nullOREmpty(this.customer.lastName),
          phone: this._nullOREmpty(this.customer.phone),
          email: this._nullOREmpty(this.customer.email),
        });
      }
    });

  }

  public async update() { 


    this.customer.firstName =  this.customerForm.value.firstName;
    this.customer.lastName = this.customerForm.value.lastName;
    this.customer.phone = this.customerForm.value.phone;
    this.customer.email = this.customerForm.value.email;


    const result = await this.customerService.update(this.customer);

    if (result.success) {
      this.router.navigate(["customers", this.customer.id]);
    }
  }

  public async deleteAddress(id: number) {
    await this.addressService.delete(id);
    this.addresses = await this.addressService.getByCustomer(this._customerId);
  }

  public newAddress() {
    this.router.navigate(["customers", this._customerId, "new-address"]);
  }

  private _nullOREmpty(value: string | undefined | null): string {

    if (!value) {
      return "";
    }

    return value;
  }


}
