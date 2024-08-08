import axios from "axios";
// add customer service
export const addCustomerService = async (data) => {
  try {
    return await axios.post("http://localhost:5000/Customers", data);
  } catch (error) {
    throw error;
  }
};

// get all customer service
export const allCustomerService = async () => {
  try {
    return await axios.get("http://localhost:5000/Customers");
  } catch (error) {
    throw error;
  }
};
// delete customer Data service
export const deleteCustomerService = async (id) => {
  try {
    return await axios.delete(`http://localhost:5000/Customers/${id}`);
  } catch (error) {
    throw error;
  }
};
