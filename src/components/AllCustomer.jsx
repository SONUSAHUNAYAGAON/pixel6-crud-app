import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCustomerSlice,
  getAllCustomerSlice,
} from "../redux/slices/customerSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const AllCustomer = () => {
  // use dispatch for fetch data...
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // access customer data to store
  const customerData = useSelector((state) => state.customers.customerData);
  // access current status
  const status = useSelector((state) => state.customers.status);
  // call the all customer
  useEffect(() => {
    dispatch(getAllCustomerSlice());
  }, [dispatch]);
  // handle delete customer
  const handleDeleteCustomer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCustomerSlice(id)).then(() => {
          Swal.fire("customer deleted.", "success");
        });
        dispatch(getAllCustomerSlice());
      }
    });
  };
  // handle edit customer
  const handleEditCustomer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/customer?customeId=${id}`);
      }
    });
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {customerData?.length === 0 ? (
          <div>No Customer, Please add one Customer...</div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3">
                  PAN NO.
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            {status === "loading" ? (
              <tbody>
                <tr>Loading</tr>
              </tbody>
            ) : (
              <tbody>
                {customerData?.map((customer, index) => (
                  <tr
                    key={index + 1}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {customer?.fullName}
                    </th>
                    <td className="px-6 py-4">{customer?.pan}</td>

                    <td className="px-6 py-4">{customer?.email}</td>
                    <td className="px-6 py-4">{customer?.mobile}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditCustomer(customer?.id)}
                        className="font-medium m-1 text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomer(customer?.id)}
                        className="font-medium m-1 text-red-600 dark:red-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </>
  );
};

export default AllCustomer;
