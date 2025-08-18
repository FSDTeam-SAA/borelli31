import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true }
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
export default Message;


