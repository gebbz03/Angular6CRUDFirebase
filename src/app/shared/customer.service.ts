import { Injectable } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList } from "angularfire2/database";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form=new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    mobile: new FormControl('',[Validators.required,Validators.minLength(8)]),
    location: new FormControl('')
  });

  getCustomers(){
    this.customerList=this.firebase.list('customers');
    return this.customerList.snapshotChanges();

  }

  insertCustomer(customer){
    this.customerList.push({
      fullname: customer.fullname,
      email: customer.email,
      mobile: customer.mobile,
      location: customer.location
    });

  }
  populateForm(customer){
    this.form.setValue(customer);

  }

  updateCustomer(customer){
    this.customerList.update(customer.$key,
      {
        fullname: customer.fullname,
        email: customer.email,
        mobile: customer.mobile,
        location: customer.location
      }
    );

  }

  deleteCustomer($key: string){

    this.customerList.remove($key);

  }



}
