import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileTags } from '../../models/mobile-tags';
import { MatTableDataSource } from '@angular/material/table';
import { MobileTagsService } from '../../../app/services/mobile-tags.service';

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
    private activatedRoute: ActivatedRoute, private tagService: MobileTagsService) { }
  TagModel: MobileTags = new MobileTags();
  displayedColumns: string[] = ['id', 'name', 'type', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  /*Table logic*/
  deleteCategory(row) {
    this.tagService.delete(row._id).subscribe((result: any) => {
      if (result.status == 200) {
        this.getTags();
        // this.dataSource.data
      }

    })
  }

  routeToTagForm() {
    this.router.navigate(['MobileTagForm'], { queryParams: { id: 'new' } });
  }

  editTag(row) {
    this.router.navigate(['home/MobileTagForm'], row._id);
  }

  getTags() {
    this.tagService.find().subscribe((result: any) => {
      if (result.status == 200) {
        this.dataSource = new MatTableDataSource<any>(result.data);
      }

    })
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  /*Table logic*/

  ngOnInit() {
    this.getTags();
  }

}
