import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerComponent } from './new-customer.component';
import { provideLocationMocks } from '@angular/common/testing';
import { CustomersService } from '../../core/services/customers.service';

describe('NewCustomerComponent', () => {
  let component: NewCustomerComponent;
  let fixture: ComponentFixture<NewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewCustomerComponent],
      providers: [
        provideLocationMocks(),
        { provide: CustomersService, userValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasError() should indicate if the field is missing a validation.', () => {
    //Arrange
    component.customerForm.controls['firstName'].setValue('');
    component.customerForm.controls['lastName'].setValue('Bntz');
    component.customerForm.controls['phone'].setValue('Jafet');
    component.customerForm.controls['email'].setValue('Jafet');
    component.customerForm.markAllAsTouched();
    component.customerForm.markAsDirty();
    // Act

    const hasErrors = component.hasError('firstName');
    // Assert
    
    expect(hasErrors).toBeTruthy();
  });


  it('hasError() should return false if the field is not missing any validation.', () => {
    //Arrange
    component.customerForm.controls['firstName'].setValue('HHHHHHHHHHH');
    component.customerForm.controls['lastName'].setValue('Bntz');
    component.customerForm.controls['phone'].setValue('Jafet');
    component.customerForm.controls['email'].setValue('Jafet');
    component.customerForm.markAllAsTouched();
    component.customerForm.markAsDirty();
    // Act

    const hasErrors = component.hasError('firstName');
    // Assert
    
    expect(hasErrors).toBeFalsy();
  });


});
