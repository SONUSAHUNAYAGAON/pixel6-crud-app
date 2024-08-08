import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  addCustomerService,
  allCustomerService,
  deleteCustomerService,
} from "./customerServices";

const initialState = {
  customerData: [],
  status: "idle",
  error: null,
};

//create customer
export const createCustomerSlice = createAsyncThunk(
  "customers/createCustomerSlice",
  async (data) => {
    try {
      const response = await addCustomerService(data);
      console.log(response);
      return response;
    } catch (error) {
      //throw error;
    }
  }
);
// get all customer data slice
export const getAllCustomerSlice = createAsyncThunk(
  "customers/getAllCustomerSlice",
  async () => {
    try {
      const response = await allCustomerService();

      return response.data;
    } catch (error) {
      //throw error;
    }
  }
);
// delete single customer data slice
export const deleteCustomerSlice = createAsyncThunk(
  "customers/deleteCustomerSlice",
  async (id) => {
    try {
      const response = await deleteCustomerService(id);

      return response;
    } catch (error) {
      //throw error;
    }
  }
);
//update //Update quiz
// export const updateQuizAdmin = createAsyncThunk(
//   "adminquiz/updateQuizAdmin",
//   async ({ quizId, updatedData, navigate }) => {
//     try {
//       const tokenAuth = localStorage.getItem("token");
//       // Check if tokenAuth exists and is not null before decoding
//       if (!tokenAuth) {
//         return;
//       }
//       const decodeToken = jwtDecode(tokenAuth);

//       const token = tokenAuth;
//       const response = await quizUpdateServiceAdmin({
//         quizId,
//         updatedData,
//         token,
//       });

//       if (
//         response.status === 201 ||
//         (response.status === 200 && decodeToken.role.includes("admin"))
//       ) {
//         toast.success("quiz updated successfully");
//         navigate("/admin/allquiz");
//       } else if (
//         response.status === 200 ||
//         (response.status === 201 && decodeToken.role.includes("superadmin"))
//       ) {
//         toast.success("quiz updated successfully");
//         navigate("/superadmin/allquiz");
//       } else {
//         toast.error("quiz updated have some error");
//         navigate("/admin/allquiz");
//       }

//       return response.data;
//     } catch (error) {
//       //throw error;
//     }
//   }
// );

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCustomerSlice.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCustomerSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createCustomerSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getAllCustomerSlice.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCustomerSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerData = action.payload;
      })
      .addCase(getAllCustomerSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteCustomerSlice.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCustomerSlice.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteCustomerSlice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;
