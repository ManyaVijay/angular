import { Component } from '@angular/core';
import { ApiServicesService } from './services/api-services.service';
import { Store } from '@ngrx/store';
import { RootReducerState, getList, getListLoading } from 'src/reducers';
import { UserListRequestAction, UserListSuccessAction } from 'src/actions/list';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edid-final';
  error: any;
  users: any[] = [];
  searchText: any;
  selectedIndices: number[] = [];
  status: number = 0;
  sortField: string | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  edids: any[] = []; // Your EDID data array
  
  

  constructor(private service:ApiServicesService, private store:Store<RootReducerState>){}

  ngOnInit(): void {
    const fileNames = [
      "BenQ SC3211",
      "Dell ZT60",
      "Haier LE39B50",
      "LG 50LA621Y",
      "Mag RD24L",
      "Normande ND3276",
      "Panasonic TH-L32B6",
      "Philips 55PFL6008",
      "Philips 226V4LSB",
      "Samsung UA46F6400",
      "Samsung UA55F6400",
      "Sharp LC50LE450M",
      "Sony KDL50W656",
    ]
    this.store.dispatch(new UserListRequestAction());
    this.service.getMonitorData(fileNames).subscribe((data) =>{
     // console.log(data)
      localStorage.setItem('data', JSON.stringify(data))
      this.users=data
      this.store.dispatch(new UserListSuccessAction({data}));
    },(error)=>{
      console.log(error)
    })
    this.store.select(getList).subscribe((data)=>{
      this.users=data
      console.log(data)
    })
  }

  toggle(edid: any) {
    if (edid.status !== 0) { // Only select enabled EDIDs
      const selectedIndex = this.selectedIndices.indexOf(edid);
      if (selectedIndex === -1) {
        this.selectedIndices.push(edid);
      } else {
        this.selectedIndices.splice(selectedIndex, 1);
      }
    }
  }

  
  

  isSelected(index: number): boolean {

    return this.selectedIndices.includes(index);
  }

  sortData(field: string) {
    if (this.sortField === field) {
      console.log(field)
      // Reverse the sorting order if the same field is clicked again
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Default to ascending order when sorting a new field
      this.sortOrder = 'asc';
    }

    this.sortField = field;

    this.edids.sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (aValue < bValue) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  
}
