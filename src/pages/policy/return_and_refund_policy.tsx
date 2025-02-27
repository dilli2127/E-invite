import React, { memo } from "react";

interface ReturnAndRefundPolicyProps {
  // Define any props here if needed
}

const ReturnAndRefundPolicy: React.FC<ReturnAndRefundPolicyProps> = () => {
  return (
    <div  style={{ padding: "20px" }}>
      <h1>Return and Refund Policy</h1>
      <p>
        We have a 5-day return policy, which means you have 5 days after
        receiving your item to request a return. Once the return product is
        received it will be inspected and the return will be approved within 2
        days
      </p>
    </div>
  );
};

export default memo(ReturnAndRefundPolicy);
