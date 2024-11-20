import { Component } from '@angular/core';
import { CustomersService } from '../../core/services/customers.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomer } from '../../core/models/customer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent {

  customerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });


  constructor(
    private customerService: CustomersService,
    private router: Router
  ) {
    
  }

  public async save() {

    const newCustomer = {
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      phone: this.customerForm.value.phone,
      email: this.customerForm.value.email
    } as ICustomer;

    const result = await this.customerService.save(newCustomer);
    console.log("🚀 ~ NewCustomerComponent ~ save ~ result:", result);

    if (result.success) {
      this.router.navigate(["customers", result.id]);
    }

  }

}
