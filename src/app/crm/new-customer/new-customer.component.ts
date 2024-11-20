import { Component } from '@angular/core';
import { CustomersService } from '../../core/services/customers.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomer } from '../../core/models/customer.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-new-customer',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent {

  customerForm: FormGroup;


  constructor(
    private customerService: CustomersService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.customerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.min(5)]),
      lastName: new FormControl('', [Validators.required,  Validators.min(1)]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  
  }

  public isFormInvalid(): boolean {
    if (this.customerForm.pristine) {
      return true;
    }

    return this.customerForm.errors != null;
  }

  public async save() {
    this.customerForm.markAllAsTouched();
    this.customerForm.markAsDirty();

    if (!this.customerForm.valid) {
      return;
    }


    const newCustomer = {
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      phone: this.customerForm.value.phone,
      email: this.customerForm.value.email
    } as ICustomer;

    const result = await this.customerService.save(newCustomer);

    if (result.success) {
      this.router.navigate(["customers", result.id]);
    }

  }

  public hasError(controlName: string): boolean {
    if (!this.customerForm.touched) {
      return false;
    }
    
    return this.customerForm.controls[controlName].errors != null
  }

}
