import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-myhome-faq',
  templateUrl: './myhome-faq.component.html',
  styleUrls: ['./myhome-faq.component.css']
})
export class MyhomeFaqComponent implements OnInit {
  panelOpenState = false;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor() { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '100%',
        height: '350px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true
      }
    ]

    this.galleryImages = this.getImages();
  }

  getImages() {
    const imagesUrls: any = [];
    imagesUrls.push(
      {
        small: '../../assets/images/payment1.PNG',
        medium: '../../assets/images/payment1.PNG',
        big: '../../assets/images/payment1.PNG',
        description: 'Click on the plus sign button in the Recent Payment Section to add a new payment.'
      },
      {
        small: '../../assets/images/payment2.PNG',
        medium: '../../assets/images/payment2.PNG',
        big: '../../assets/images/payment2.PNG',
        description: 'Once the modal pops up, fill in the correct information of the new payment. For the Rent Month Selection, please select the month that this payment is for. For example, if you are paying February rent, please select Feb.'
      },
      {
        small: '../../assets/images/payment1.PNG',
        medium: '../../assets/images/payment1.PNG',
        big: '../../assets/images/payment1.PNG',
        description: 'After adding new payment, its status is "Pending". Once I review your payment, I will decide to approve or reject based on the information associated with that payment.'
      }
    )

    return imagesUrls;
  }
}
