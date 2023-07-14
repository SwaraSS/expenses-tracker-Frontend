import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
//import moneySVG from "../../img/money.svg";
import { updateExpenseAction } from "../../redux/slices/expenses/expensesAction";
import navigate from "../../utils/navigate";
import DisabledButton from "../../components/DisabledButton";
import { useLocation } from "react-router-dom";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import SuccessMessage from "../../components/SuccessMessage";

//Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});
const EditExpense = ({ /*location */} ) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {expense} = location.state;
    const expenses = useSelector((state) => state?.expenses);
    const { isExpUpdated, expLoading, expAppErr, expServerErr, isExpCreated } = expenses;

  const formik = useFormik({
    initialValues: {
      title: expense?.title,
      description: expense?.description,
      amount: expense?.amount,
    },
    onSubmit: values => {
      const transactionData = {
        ...values,
        id: expense?._id,
      };
      dispatch(updateExpenseAction(transactionData));
    },
    validationSchema: formSchema,
  });

 
  //redirect
  // useEffect(() => {
  //   if (isExpUpdated) {
  //     navigate("user-profile-expenses", undefined);
  //   }
  //   // if (isIncUpdated) {
  //   //   navigate("user-profile-income", undefined);
  //   // }
  // }, [isExpUpdated, /*isIncUpdated*/]);
  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            //src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <h2 className="mb-4 fw-light">
                  { " Update Expense"}
                </h2>
                {/* Display Err */}
                {expAppErr || expServerErr ? (
                  <ErrorDisplayMessage
                    error={{ appErr: expAppErr, serverErr: expServerErr }}
                  />
                ) : null}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onBlur={formik.handleBlur("title")}
                    onChange={formik.handleChange("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
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
                {expLoading ? (
                  <DisabledButton />
                 ) : ( 
                  <button type="submit" className="btn btn-primary mb-4 w-100">
                    Add
                  </button>
                 )} 
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditExpense;