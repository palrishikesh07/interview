import ShowList from "./ShowList";

const Promise = () => {
  const fetchAPIResponse = async () => {
    const data = await fetch("https://dummyjson.com/todos");
    return data.json();
  };
  return <ShowList fetchAPIResponse={fetchAPIResponse} />;
};

export default Promise;
