import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileTags } from '../../models/mobile-tags';
import { MatTableDataSource } from '@angular/material/table';
import { MobileTagsService } from '../../../app/services/mobile-tags.service';
import { startWith, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';

export class mobileTagFilter {
  name: string = '';
}

@Component({
  selector: 'app-mobile-tags',
  templateUrl: './mobile-tags.component.html',
  styleUrls: ['./mobile-tags.component.css']
})

export class MobileTagsComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    // let pageIndex = this.paginator.pageIndex + 1

    this.paginator.page.pipe(
      startWith(null),
      tap(() => this.getTags(this.paginator.pageIndex+1, this.paginator.pageSize))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private tagService: MobileTagsService) { }
  TagModel: MobileTags = new MobileTags();
  displayedColumns: string[] = ['id', 'name', 'type', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  count: number
  /*Table logic*/
  deleteCategory(row) {
    this.tagService.delete(row._id).subscribe((result: any) => {
      if (result.status == 200) {
        this.getTags(1, 5);
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

  getTags(pageIndex, size) {
    this.tagService.find(pageIndex, size).subscribe((result: any) => {
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
    this.getTagCount();
  }

  getTagCount() {
    this.tagService.getCount().subscribe((result: any) => {
      if (result.success) {
        this.count = result.count;
      }
    })
  }

}
