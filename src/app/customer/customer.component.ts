import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../shared/customer.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  submitted: boolean;

  formControls=this.customerService.form.controls;


  ngOnInit() {
  }

  onSubmit(){
    this.submitted=true;
    if(this.customerService.form.valid){
    if(this.customerService.form.get('$key').value==null){
              this.customerService.insertCustomer(this.customerService.form.value);
              Swal('Message', 'Submitted successfully!', 'success');
              this.customerService.form.reset();
     } else    {
      this.customerService.updateCustomer(this.customerService.form.value);
              Swal('Message', 'Updated successfully!', 'success');
              this.customerService.form.reset();
     }
  
    }
  }

}
