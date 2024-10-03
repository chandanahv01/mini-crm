import mongoose from 'mongoose';

// Define the Company schema
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  industry: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: {
    type: String,
    default: '',
    maxLength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists
const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;