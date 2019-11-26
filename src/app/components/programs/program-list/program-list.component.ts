import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProgramFilter } from '../program-filter';
import { ProgramService } from '../program.service';
import { Program } from '../program';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { startWith, tap } from 'rxjs/operators';

@Component({
    selector: 'program',
    templateUrl: 'program-list.component.html'
})
export class ProgramListComponent {

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngAfterViewInit(): void {

        this.paginator.page.pipe(
            startWith(null),
            tap(() => this.getPrograms(this.paginator.pageIndex + 1, this.paginator.pageSize))).subscribe();
    }
    @ViewChild(MatPaginator, { static: false })
    paginator: MatPaginator

    filter = new ProgramFilter();
    selectedProgram: Program;
    dataSource = new MatTableDataSource<Program>([]);
    count: number;

    displayedColumns: string[] = ['id', 'title', 'description', 'time', 'action']

    constructor(private programService: ProgramService) {
    }

    delete(row) {
        this.programService.delete(row._id).subscribe((response: any) => {
            if (response.status === 200) {
                this.getPrograms(this.paginator.pageIndex+1, this.paginator.pageSize);
            }
        },
            error => console.error(error))
    }

    ngOnInit() {
        this.getCount();
        // this.getPrograms(this.paginator.pageIndex, this.paginator.pageSize);
        // this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    search(): void {
        this.programService.load(this.filter);
    }

    select(selected: Program): void {
        this.selectedProgram = selected;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getPrograms(index, size) {
        this.programService.find(index, size).subscribe((response: any) => {
            console.log(response.data)
            if (response.status === 200) {
                this.dataSource = new MatTableDataSource(response.data)
            }
        },
            error => console.error(error))
    }

    getCount() {
        this.programService.getCount().subscribe((response: any) => {
            console.log(response)
            if (response.success) {
                this.count = response.count;
                console.log(this.count)
            }
        },
            error => console.error(error))
    }

}
