import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../Review';
  
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  name = '';
  rating = 1;
  message = '';
  reviews: Review[] = [];
  ratingsCount: {[rating: number]: number} = {};
  ratingsTableRows: any[] = [];
  count: {[key: number]: number} = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchReviews();
  }

  fetchReviews() {
    this.http.get<Review[]>('http://localhost:8080/reviews')
      .subscribe(
        (data) => {
          this.reviews = data;
          this.calculateRatingsCount();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  calculateRatingsCount() {
    this.ratingsCount = this.reviews.reduce((count: { [key: number]: number }, review) => {
      const rating = review.rating;
      return {
        ...count,
        [rating]: (count[rating] || 0) + 1,
      };
    }, {});

    this.ratingsTableRows = Object.keys(this.ratingsCount).map((rating: string) => {
      return {
        rating: rating,
        count: this.ratingsCount[Number(rating)]
      };
    });
  }

  handleReviewSubmit(name: string, rating: number, message: string) {
    const newReview = { name, rating, message };
    this.http.post<Review>('http://localhost:8080/reviews', newReview)
      .subscribe(
        (data) => {
          this.reviews.push(data);
          this.calculateRatingsCount();
          alert('Review stored successfully!');
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getArray(length: number): any[] {
    return Array(length).fill(0);
  }

  handleSubmit() {
    this.handleReviewSubmit(this.name, this.rating, this.message);
    this.name = '';
    this.rating = 1;
    this.message = '';
  }
}
