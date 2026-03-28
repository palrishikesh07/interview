import React, { useState } from "react";

interface OrderFormProps {
  onSubmitForm(order: { name: string; cups: number }): void;
}

const OrderForm = ({ onSubmitForm }: OrderFormProps) => {
  const [name, setName] = useState<string>("Masala");
  const [cups, setCups] = useState<number>(1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmitForm({ name, cups });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Chai Name</label>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <label>Cups</label>
      <input
        type="number"
        value={cups}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCups(Number(e.target.value))
        }
      />
      <button type="submit">Place order</button>
    </form>
  );
};

export default OrderForm;
