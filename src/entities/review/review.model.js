import mongoose from 'mongoose';

const ReviewStatus = Object.freeze({
  PENDING: 'Pending',
  APPROVED: 'Approved',
  DECLINED: 'Declined'
});

const ReviewSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, default: '' },
    status: { type: String, enum: Object.values(ReviewStatus), default: ReviewStatus.PENDING }
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
export default Review;
export { ReviewStatus };


