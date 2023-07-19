import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addNewIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../../components/DisabledButton";
import { useNavigate } from "react-router-dom";

// Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

const AddIncome = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const income = useSelector((state) => state?.income);
  const { incLoading, incAppErr, incServerErr, isIncCreated } = income;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: (values) => {
      dispatch(addNewIncomeAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    if (isIncCreated) {
      nav("/user-income", undefined);
    }
  }, [isIncCreated]);

  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Income</span>
                  <h2 className="mb-4 fw-light">Record New Income</h2>
                  {/* Display income Err */}
                  {incServerErr || incAppErr ? (
                    <div className="alert alert-danger" role="alert">
                      {incServerErr} {incAppErr}
                    </div>
                  ) : null}
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
                      <option value="salary">Salary</option>
                      <option value="mutual funds">Mutual Funds</option>
                      <option value="stocks">Stocks</option>
                      <option value="interest">Interest</option>
                      <option value="other">Other</option>
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
                  {incLoading ? (
                    <DisabledButton />
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success mb-4 w-100"
                    >
                      Record Income
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddIncome;