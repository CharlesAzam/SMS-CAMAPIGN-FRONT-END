import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoLibraryService } from '../video-library.service';
import { VideoLibrary } from '../video-library';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'video-library-edit',
  templateUrl: './video-library-edit.component.html'
})
export class VideoLibraryEditComponent implements OnInit {

    id: string;
    videoLibrary: VideoLibrary;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private videoLibraryService: VideoLibraryService) { 
    }

    ngOnInit() {
        this
            .route
            .params
            .pipe(
                map(p => p['id']),
                switchMap(id => {
                    if (id === 'new') return of(new VideoLibrary());
                    return this.videoLibraryService.findById(id)
                })
            )
            .subscribe(
                videoLibrary => { 
                    this.videoLibrary = videoLibrary; 
                    this.errors = ''; 
                },
                err => { 
                    this.errors = 'Error loading'; 
                }
            );
    }

    save() {
        this.videoLibraryService.save(this.videoLibrary).subscribe(
            videoLibrary => { 
                this.videoLibrary = videoLibrary; 
                this.errors = 'Save was successful!'; 
            },
            err => { 
                this.errors = 'Error saving'; 
            }
        );
    }
}