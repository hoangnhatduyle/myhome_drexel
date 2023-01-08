import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Photo } from 'src/app/_models/photo';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  awaitingPhotos?: Photo[];

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe({
      next: photos => this.awaitingPhotos = photos
    })
  }

  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe({
      next: _ => {
        this.toastr.success("You have approved a photo");
        this.awaitingPhotos?.splice(this.awaitingPhotos.findIndex(p => p.id === photoId), 1);
      }
    })
  }

  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe({
      next: _ => {
        this.toastr.error("You have reject a photo");
        this.awaitingPhotos?.splice(this.awaitingPhotos.findIndex(p => p.id === photoId), 1);
      }
    })
  }

}
