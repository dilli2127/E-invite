import React, { memo } from "react";

interface RefundsProps {
    // Define any props here if needed
}

const Refunds: React.FC<RefundsProps> = () => {
    return (
        <div  style={{ padding: "20px" }}>
            <h1>Refunds</h1>
            <p>
                We will notify you once we’ve received and inspected your return, and let you know if
                the refund was approved or not. If approved, you’ll be automatically refunded on your
                original payment method within 10 business days. Please remember it can take some
                time for your bank or credit card company to process and post the refund too. If more
                than 15 business days have passed since we’ve approved your return, please contact
                us at Enter email /Ph no
            </p>
        </div>
    );
};

export default memo(Refunds);
