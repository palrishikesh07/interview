import { useEffect, useState } from "react";

interface A {
  name: string;
}

interface A {
  age: number;
}

const userAB: A & B;

// Type

// type User = {
//   name: string;
// };

// type User = {
//   age: number;
// };

// const userType: User = {
//   name: "Hrishi",
//   age: 1,
// };

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
interface ShowlistProps {
  fetchAPIResponse: () => Promise<{ todos: Todo[] }>;
}

const ShowList: React.FC<ShowlistProps> = ({ fetchAPIResponse }) => {
  const [data, setData] = useState<Todo[]>([]);

  useEffect(() => {
    fetchAPIResponse().then((response) => {
      setData(response?.todos);
    });
  }, []);
  return (
    <div>
      <ul>
        {data?.map((e) => (
          <li>{e.todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
