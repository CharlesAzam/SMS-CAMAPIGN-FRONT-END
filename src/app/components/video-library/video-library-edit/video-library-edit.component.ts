import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoLibraryService } from '../video-library.service';
import { VideoLibrary } from '../video-library';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'video-library-edit',
  templateUrl: './video-library-edit.component.html'
})
export class VideoLibraryEditComponent implements OnInit {

    videoLibrary: VideoLibrary;
    errors: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private videoLibraryService: VideoLibraryService) { 
    }

    ngOnInit() {
        this.videoLibrary = new VideoLibrary();
        this.route.params.subscribe(params => {
            if (params.id !== 'new') {
              this.videoLibraryService.findById(params.id).subscribe((response: any) => {
                let library = response.data[0]
                    let vidLib = {
                        title: library.name,
                        streamURL: library.streamURL
                    }
                    console.log("response=======>",response,'[][][][][]',vidLib)
                    this.videoLibrary = vidLib; 
                    this.errors = ''; 
              }, error => console.error(error));
            }
        })
    }

    save() {
        this.route.params.subscribe(params => {
            if(params.id ==  "new") {
                this.videoLibraryService.save(this.videoLibrary).subscribe(
                    videoLibrary => { 
                        console.log("-==-=-=-=-=-=videoLibrary",videoLibrary)
                        this.videoLibrary = videoLibrary; 
                        this.errors = 'Save was successful!'; 
                        this.router.navigate(['/home/video-library/video-library'])
        
                    },
                    err => { 
                        this.errors = 'Error saving'; 
                    }
                );
            } else {
                let data=  {
                   _id : params.id,
                   ...this.videoLibrary
                } 
                this.videoLibraryService.update(data).subscribe(
                    videoLibrary=>{
                        this.videoLibrary = videoLibrary; 
                        this.errors = 'Update was successful!'; 
                        this.router.navigate(['/home/video-library/video-library'])
                    }
                ),
                err => {
                    this.errors = 'Error saving'
                }
                
            }
        })
        
            
        
    }
}