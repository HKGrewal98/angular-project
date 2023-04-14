import { Component, OnInit } from '@angular/core';
import { ContactDetails } from '../ContactUs';
import { FormData } from '../ContactUs';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {
  contactDetails: any;
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  formSubmitted = false;
  formError = '';
  error: any;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContactDetails()
      .subscribe(
        data => this.contactDetails = data,
        error => this.error = error.message
      );
  }
  
  onSubmit() {
    this.formSubmitted = true;
    alert('Form submitted successfully! We will get in touch within 24 hours.');
  }

}