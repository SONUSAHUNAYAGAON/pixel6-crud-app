import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCustomerSlice } from "../redux/slices/customerSlice";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const [pan, setPan] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postcode, setPostCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  // call the pan api when complete the validation then show result
  useEffect(() => {
    const verifyPan = async () => {
      if (pan.length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
        try {
          const response = await axios.post(
            "https://lab.pixel6.co/api/verify-pan.php",
            { panNumber: pan }
          );
          if (response.data.statusCode === 200 && response.data.isValid) {
            setFullName(response.data.fullName);
          } else {
            toast.error("Invalid PAN number");
            setFullName("");
          }
        } catch (error) {
          toast.error("Error verifying PAN");
          setFullName("");
        } finally {
          setFullName("");
        }
      } else {
        setFullName("");
      }
    };

    verifyPan();
  }, [pan]);

  // handle full Name change
  const handleChangeFullName = (e) => {
    const value = e.target.value;
    setFullName(value);
  };

  // handle postcode and set the data city and state
  useEffect(() => {
    const handlePostcodeChange = async () => {
      if (postcode.length === 6 && /^[0-9]{6}$/.test(postcode)) {
        try {
          const response = await axios.post(
            "https://lab.pixel6.co/api/get-postcode-details.php",
            { postcode: postcode }
          );
          if (response.data.statusCode === 200) {
            setCities(response.data.city);
            setStates(response.data.state);
          } else {
            toast.error("Invalid postcode");
            setCities([]);
            setStates([]);
          }
        } catch (error) {
          console.log("Error fetching postcode details");
        } finally {
        }
      }
    };
    // call this api
    handlePostcodeChange();
  }, [postcode]);

  // handle submit all data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all addresses are valid before submitting
    if (!postcode || postcode.length !== 6 || !state || !city) {
      toast.error("Please fill all address fields");
      return;
    }

    const data = {
      pan,
      fullName,
      email,
      mobile,
      addresses: [{ addressLine1, addressLine2, postcode, state, city }],
    };

    try {
      const response = await dispatch(createCustomerSlice(data));
      if (response.payload.status === 201) {
        toast.success("Customer added successfully");
        navigate("/");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  // handle change city name
  const handleCityChange = (cityName) => {
    setCity(cityName);
  };

  // handle change state value
  const handleStateChange = (stateName) => {
    setState(stateName);
  };

  return (
    <form className="max-w-sm mx-auto mt-5" onSubmit={handleSubmit}>
      {/* PAN No */}
      <div className="mb-5 relative">
        <label
          htmlFor="pan"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          PAN No. <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="pan"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
          maxLength="10"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ABCDE1234E"
          required
        />
      </div>
      {/* Full Name */}
      <div className="mb-5">
        <label
          htmlFor="fullName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          maxLength="140"
          onChange={handleChangeFullName}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Full Name"
          required
        />
      </div>
      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength="255"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Email"
          required
        />
      </div>
      {/* Mobile Number */}
      <div className="mb-5">
        <label
          htmlFor="mobile"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            +91
          </span>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            pattern="[0-9]{10}"
            maxLength="10"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Mobile Number"
            required
          />
        </div>
      </div>

      {/* Addresses */}

      <div className="mb-5">
        <div className="mb-2">
          <label
            htmlFor={`addressLine1`}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address Line 1 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id={`addressLine1`}
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address Line 1"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor={`addressLine2`}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address Line 2
          </label>
          <input
            type="text"
            id={`addressLine2`}
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address Line 2"
          />
        </div>
        <div className="mb-2 relative">
          <label
            htmlFor={`postcode`}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Postcode <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[0-9]{0,6}$/.test(value)) {
                setPostCode(value);
              }
            }}
            maxLength="6"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Postcode"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            State
          </label>
          <select
            value={state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City
          </label>
          <select
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Customer
      </button>
    </form>
  );
};

export default AddCustomer;
