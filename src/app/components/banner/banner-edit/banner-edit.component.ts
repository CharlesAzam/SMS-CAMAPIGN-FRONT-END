import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../banner.service';
import { Banner } from '../banner';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'banner-edit',
  templateUrl: './banner-edit.component.html'
})
export class BannerEditComponent implements OnInit {

    id: string;
    banner: Banner;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private bannerService: BannerService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new Banner());
                    return this.bannerService.findById(id)
                })
            )
            .subscribe(
                banner => { 
                    this.banner = banner; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.bannerService.save(this.banner).subscribe(
            banner => { 
                this.banner = banner; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}