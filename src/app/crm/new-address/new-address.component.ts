import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../core/services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddress } from '../../core/models/address.interface';

@Component({
  selector: 'app-new-address',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './new-address.component.html',
  styleUrl: './new-address.component.scss'
})
export class NewAddressComponent {

  addressForm = new FormGroup({
    firstLine: new FormControl('', [Validators.required]),
    secondLine: new FormControl('', [])
  });

  private _customerId?: number;


  constructor(
    private addresService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(p => {
      this._customerId = p["id"];
    });    
  }

  public async save() {

    const newAddress = {
      firstLine: this.addressForm.value.firstLine,
      secondLine: this.addressForm.value.secondLine

    } as IAddress;

    const result = await this.addresService.save(newAddress);

    if (result.success) {
      this.router.navigate(["customers", this._customerId]);
    }

  }
}
