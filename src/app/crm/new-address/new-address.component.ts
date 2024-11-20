import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../core/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddress } from '../../core/models/address.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-address',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss'
})
export class NewAddressComponent {

  addressForm: FormGroup;

  private _customerId?: number;


  constructor(
    private addresService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {


    this.addressForm = new FormGroup({
      firstLine: new FormControl('', [Validators.required]),
      secondLine: new FormControl('', [])
    });
    this.route.params.subscribe(p => {
      this._customerId = p["id"];
    });    
  }

  public async save() {
    this.addressForm.markAllAsTouched();
    this.addressForm.markAsDirty();

    if (!this.addressForm.valid) {
      return;
    }
    const newAddress = {
      firstLine: this.addressForm.value.firstLine,
      secondLine: this.addressForm.value.secondLine,
      customerId: this._customerId

    } as IAddress;

    const result = await this.addresService.save(newAddress);

    if (result.success) {
      this.router.navigate(["customers", this._customerId]);
    }

  }

  public hasError(controlName: string): boolean {
    if (!this.addressForm.touched) {
      return false;
    }
    
    return this.addressForm.controls[controlName].errors != null
  }

}
