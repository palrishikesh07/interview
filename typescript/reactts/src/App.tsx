import "./App.css";
import Card from "./components/Card";
import { ChaiCard } from "./components/ChaiCard";
import ChaiList from "./components/ChaiList";
import Counter from "./components/Counter";
import InterviewQuestion from "./components/interview/InterviewQuestion";
import OrderForm from "./components/OrderForm";
import type { Chai } from "./components/types";

const menu: Chai[] = [
  { id: 1, name: "Masala", price: 25 },
  { id: 2, name: "Giner", price: 50 },
  { id: 3, name: "Lemon", price: 45 },
];

function App() {
  return (
    <>
      {/* <div>
        <h2>Vite & React</h2>
      </div>
      <ChaiCard name="Green Tea" price={2.99} />
      <ChaiCard name="Black Tea" price={3.49} isSpecial={true} />
      <Counter />
      <div>
        <ChaiList items={menu} />
      </div>
      <div>
        <OrderForm
          onSubmitForm={(order) => {
            console.log("Placed", order.name, order.cups);
          }}
        />
      </div>
      <div>
        <Card title="Chai and TS" footer={<button>Order Now</button>} />
      </div> */}
      {/* Inteview */}

      <div>
        <InterviewQuestion />
      </div>
    </>
  );
}

export default App;
