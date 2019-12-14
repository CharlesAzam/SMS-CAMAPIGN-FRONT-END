import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileTags } from '../../models/mobile-tags';
import { MatTableDataSource } from '@angular/material/table';
import { MobileTagsService } from '../../../app/services/mobile-tags.service';
import { startWith, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material';
import { LanguageService } from 'src/app/services/language.service';

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
      tap(() => this.getTags(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private tagService: MobileTagsService,
    private languageService: LanguageService) { }
  TagModel: MobileTags = new MobileTags();
  displayedColumns: string[] = ['id', 'name', 'type', 'action'];
  datasourceEN = new MatTableDataSource<any>([]);
  datasourceSW = new MatTableDataSource<any>([]);
  languages: any[] = []
  swahiliTagCount: number;
  englishTagCount: number; count: number

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
        console.log(result.data)

        this.datasourceSW = new MatTableDataSource<any>(result.data.filter((data) => {
          if (data.language.name.toLowerCase() === 'swahili') {
            return data;
          }
        }));
        this.swahiliTagCount = this.datasourceSW.data.length;

        this.datasourceEN = new MatTableDataSource<any>(result.data.filter((data) => {
          if (data.language.name.toLowerCase() === 'english') {
            return data;
          }
        }));

        this.englishTagCount = this.datasourceEN.data.length;
      }

    })
  }
  applyFilter(filterValue: string) {
    this.datasourceEN.filter = filterValue.trim().toLowerCase();
    this.datasourceSW.filter = filterValue.trim().toLowerCase();
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
