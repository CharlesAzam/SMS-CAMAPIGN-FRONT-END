import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material";
import { startWith, tap } from "rxjs/operators";
import { LeagueService } from "src/app/services/league.service";

@Component({
  selector: "app-leaguelist",
  templateUrl: "./leaguelist.component.html",
  styleUrls: ["./leaguelist.component.css"]
})
export class LeaguelistComponent implements OnInit {
  ngAfterViewInit(): void {
    //  After Adding get categories plce it here
    let pageIndex = this.paginator.pageIndex + 1;
    this.paginator.page
      .pipe(
        startWith(null),
        tap(() =>
          this.getLeagues(this.paginator.pageIndex + 1, this.paginator.pageSize)
        )
      )
      .subscribe();
  }
  @ViewChild(MatPaginator, { static: false })
  paginator: MatPaginator;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private leagueService: LeagueService
  ) {}

  displayedColumns: string[] = ["position", "name", "Status", "symbol"];
  count: number;
  dataSource = new MatTableDataSource<any>([]);

  /*Table logic*/
  deleteLeague(row) {
    //  Add delete service here
    this.leagueService.delete(row._id).subscribe(
      (response: any) => {
        if (response.status === 200) this.getLeagues(1, 10);
      },
      error => console.error(error)
    );
  }

  editLeague(row) {
    this.router.navigate(["home/CreateLeague", row._id]);
  }

  routeToCategoryForm() {
    this.router.navigate(["home/CreateLeague"]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*Table logic*/

  ngOnInit() {
    this.getLeagueCount();
  }

  getLeagues(pageNumber, size) {
    // Add Service here
    this.leagueService.find(pageNumber, size).subscribe((result: any) => {
      if (result.status == 200) {
        this.dataSource = new MatTableDataSource<any>(result.data);
      }
    });
  }

  getLeagueCount() {
    //Add get category service here
    this.leagueService.getCount().subscribe((result: any) => {
      if (result.success) {
        this.count = result.count;
      }
    });
  }

  routeToCreateLeague() {
    console.log("Route clicked");
    this.router.navigate(["home/CreateLeague/new"]);
  }
}
