import connectDB from '../../utils/connectDB';
import Company from '../../models/Company';

export default async function handler(req, res) {
  await connectDB(); // Ensure the database connection is established

  if (req.method === 'POST') {
    // Handle POST requests to create a new company
    try {
      const company = new Company(req.body);
      await company.save();
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } 
  else if (req.method === 'GET') {
    // Handle GET requests to retrieve all companies
    try {
      const companies = await Company.find(); // Fetch all companies from the database
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } 
  else if (req.method === 'DELETE') {
    // Handle DELETE requests to remove a company
    const { id } = req.query; // Get the company ID from the query parameters
    try {
      const deletedCompany = await Company.findByIdAndDelete(id); // Delete the company
      if (!deletedCompany) return res.status(404).json({ message: 'Company not found' });
      res.status(200).json({ message: 'Company deleted successfully' }); // Return success message
    } catch (error) {
      res.status(500).json({ message: error.message }); // Handle errors
    }
  } 
  else {
    res.status(405).json({ message: 'Only POST, GET, and DELETE requests are allowed' });
  }
}
