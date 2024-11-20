import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddressComponent } from './new-address.component';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, RouterModule } from '@angular/router';

describe('NewAddressComponent', () => {
  let component: NewAddressComponent;
  let fixture: ComponentFixture<NewAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAddressComponent, RouterModule.forRoot([])],
      providers: [
        provideLocationMocks(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
