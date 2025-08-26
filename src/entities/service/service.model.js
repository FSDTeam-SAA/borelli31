import mongoose from 'mongoose';
import ServiceCategory from '../../lib/serviceTypes.js';

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required.'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Service category is required.'],
      enum: [ServiceCategory.COMMERCIAL, ServiceCategory.RESIDENTIAL, ServiceCategory.OFFER]
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    imageUrl: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Speed up queries filtering by category and ensure uniqueness per category
ServiceSchema.index({ category: 1 });
ServiceSchema.index({ name: 1, category: 1 }, { unique: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export default Service;


