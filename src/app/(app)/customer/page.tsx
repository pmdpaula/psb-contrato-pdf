"use client";

import { CustomerProvider } from "./CustomerContext";
import { CustomerDataTable } from "./CustomerDataTable";
// import { FormCustomer } from "./form-customer/FormCustomer";

export type ActionFormProps = "create" | "edit" | "delete" | "none";

export interface OpenFormProps {
  open: boolean;
  action: ActionFormProps;
}

const CustomerPage = () => {
  return (
    <CustomerProvider>
      <CustomerDataTable />
    </CustomerProvider>
  );
};

export default CustomerPage;
