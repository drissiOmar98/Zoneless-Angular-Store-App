export type UserReview = {
  id: string;
  productId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};


export type AddReviewParams = Pick<UserReview, 'title' | 'comment' | 'rating' >;
