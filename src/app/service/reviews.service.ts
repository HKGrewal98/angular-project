import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../Review';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private reviewsUrl = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) { }

  async getReviews(): Promise<Review[]> {
    const response = await this.http.get(this.reviewsUrl).toPromise();
    return response as Review[];
  }

  async addReview(review: Review): Promise<Review> {
    const response = await this.http.post(this.reviewsUrl, review).toPromise();
    return response as Review;
  }
  
}
