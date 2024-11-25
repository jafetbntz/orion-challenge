import { Routes } from '@angular/router';
import { CustomerListComponent } from './crm/customer-list/customer-list.component';
import { CustomerDetailComponent } from './crm/customer-detail/customer-detail.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { NewCustomerComponent } from './crm/new-customer/new-customer.component';
import { NewAddressComponent } from './crm/new-address/new-address.component';

export const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch:'full' },
    { path: 'customers', component: CustomerListComponent},
    { path: 'customers/new', component: NewCustomerComponent},
    { path: 'customers/:id', component: CustomerDetailComponent},
    { path: 'customers/:id/new-address', component: NewAddressComponent},
    { path: '**', component: NotFoundComponent}
];
