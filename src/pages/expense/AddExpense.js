import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addNewExpAction } from "../../redux/slices/expenses/expensesAction";
import DisabledButton from "../../components/DisabledButton";

// Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

const AddExpense = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: (values) => {
      dispatch(addNewExpAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    // if (isExpCreated) {
    //   nav( "user-profile-expenses", undefined);
    // }
  }, [/isExpCreated/]);

  return (
    <>
      <section className="py-5 bg-danger vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Expense</span>
                  <h2 className="mb-4 fw-light">Record New Expense</h2>
                  <div className="mb-3 input-group">
                    <select
                      value={formik.values.title}
                      onBlur={formik.handleBlur("title")}
                      onChange={formik.handleChange("title")}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Title
                      </option>
                      <option value="food">Food</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="rent">Rent</option>
                      <option value="bills">Bills</option>
                      <option value="fees">Fees</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.title && formik.errors.title}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.description}
                      onBlur={formik.handleBlur("description")}
                      onChange={formik.handleChange("description")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.description && formik.errors.description}
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.amount}
                      onBlur={formik.handleBlur("amount")}
                      onChange={formik.handleChange("amount")}
                      className="form-control"
                      type="number"
                      placeholder="Enter Amount"
                    />
                  </div>
                  {/* Err */}
                  <div className="text-danger mb-2">
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                  <DisabledButton />
                  <button type="submit" className="btn btn-danger mb-4 w-100">
                    Record Expense
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
