import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../shared/customer.service";
import  Swal  from "sweetalert2";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(private customerService: CustomerService) { }
  customerArray=[];
  searchText: string="";l

  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      list => {

        this.customerArray=list.map(item => {
          return {
            $key: item.key,
              ...item.payload.val()

          };
        });

      }
    );

  }

  onDelete($key){
    if(confirm('Are you sure to delete this record?')){

      this.customerService.deleteCustomer($key);

      Swal('Message', 'Removed successfully!', 'success');



    }

  }

filterCondition(customer){

  return customer.fullname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
}


}
