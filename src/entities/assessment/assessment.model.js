import mongoose from 'mongoose';
import ServiceCategory from '../../lib/serviceTypes.js';
import Service from '../service/service.model.js';

const AssessmentStatus = Object.freeze({
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed'
});

const AssessmentSchema = new mongoose.Schema(
  {
    inquiryId: { type: String, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    propertyAddress: { type: String, required: true },

    category: {
      type: String,
      required: true,
      enum: [ServiceCategory.COMMERCIAL, ServiceCategory.RESIDENTIAL]
    },

    service: { type: mongoose.Schema.Types.ObjectId, ref: Service.modelName, required: true },

    status: {
      type: String,
      enum: [AssessmentStatus.PENDING, AssessmentStatus.IN_PROGRESS, AssessmentStatus.COMPLETED],
      default: AssessmentStatus.PENDING
    }
  },
  { timestamps: true }
);

// Generate a human-friendly inquiry id if not present
AssessmentSchema.pre('save', function (next) {
  if (!this.inquiryId) {
    const random = Math.floor(100000 + Math.random() * 900000);
    this.inquiryId = `QU-${random}`;
  }
  next();
});

const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);
export default Assessment;
export { AssessmentStatus };


