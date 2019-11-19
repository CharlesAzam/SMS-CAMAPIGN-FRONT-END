import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileTags } from '../../models/mobile-tags';
import { MatTableDataSource } from '@angular/material/table';
import {MobileTagsService} from '../../../app/services/mobile-tags.service';


// export class MobileTags{
//      id: string;type
//      name: string;
//      status:string;
//      action: string
    
// }

export class mobileTagFilter {
  name: string = '';
}

@Component({
  selector: 'app-mobile-tags',
  templateUrl: './mobile-tags.component.html',
  styleUrls: ['./mobile-tags.component.css']
})

export class MobileTagsComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,private createMobileTagService: MobileTagsService) { }
    TagModel: MobileTags = new MobileTags();
    displayedColumns: string[] = ['id', 'name', 'status', 'action'];
    dataSource = new MatTableDataSource<any>([]);

  

  /*Table logic*/
  deleteCategory(row) {
  }

  editCategory(row) {
  }

  routeToTagForm(){
    this.router.navigate(['home/MobileTagForm']);
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  /*Table logic*/

  ngOnInit() {
    this.createMobileTagService.find().subscribe((result:any)=>{
      if(result.status == 200){
        this.dataSource = new MatTableDataSource<any>(result.data);
        console.log("This is the Table Data \n"+JSON.stringify(this.dataSource));
      }

    })
  }

}
