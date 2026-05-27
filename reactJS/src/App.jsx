import { BrowserRouter } from "react-router";
import "./App.css";
import Autofill from "./components/Autofill";
import HOC from "./components/HOC";
import LazyComponent from "./components/lazyLoading/LazyComponent";
import WindowEvent from "./components/lifeCycle/WindowEvent";
import ModalBody from "./components/modal/ModalBody";
import OnlineStatus from "./components/OnlineStatus";
import OTP from "./components/OTP";
import RouterHome from "./components/routers/RouterHome";
import Mainextra from "./components/search/extra/Mainextra";
import MainSearch from "./components/search/Manually/MainSearch";
import MainApp from "./components/search/new/MainApp";
import Rating from "./components/star/Rating";
import Stoper from "./components/Stoper";
import Timer from "./components/Timer";
import Virtualization from "./components/Virtualization";
import VirtualizedList from "./components/VirtualizedList";
import SimpleReducer from "./simpleReducer/SimpleReducer";
import RouterNewComponent from "./components/RoutersNew/RouterNewComponent";
import { ContextComponent } from "./ContextComponent";
import { ReducerComponentCounter } from "./components/ReducerComponent";
import ImperativeParent from "./components/ImperativeParent";
import { UseIDComponent } from "./components/UseIDComponent";
import UseTransitionExample from "./components/UseTransitionExample";
import UseDefferedValueComponent from "./components/UseDefferedValueComponent";
import { FilterSearch } from "./components/interviewQuestion/FilterSearch";
import UseMemoExample from "./components/interviewQuestion/UseMemoExample";
import SearchFilterDebounce from "./components/interviewQuestion/SearchFilterDebounce";
import Pagination from "./components/interviewQuestion/Pagination";
import UseMemoOptimzation from "./components/interviewQuestion/UseMemoOptimzation";
import CallbackMemo from "./components/interviewQuestion/CallbackMemo";
import Todo from "./components/interviewQuestion/Todo";

function App() {
  return (
    <>
      {/* <Autofill /> */}
      {/* <Rating /> */}
      {/* <OTP /> */}
      {/* <ModalBody /> */}
      {/* <Stoper /> */}
      {/* <Timer /> */}
      {/* <MainSearch /> */}
      {/* <OnlineStatus /> */}
      {/* <LazyComponent /> */}
      {/* <Virtualization /> */}
      {/* <VirtualizedList /> */}
      {/* <MainApp /> */}
      {/* <Mainextra /> */}
      {/* <WindowEvent /> */}
      {/* <SimpleReducer /> */}
      {/* <HOC/> */}
      {/* <BrowserRouter>
        <RouterHome/>
      </BrowserRouter> */}
      {/* <RouterNewComponent/> */}
      {/* <ContextComponent/> */}
      {/* <ReducerComponentCounter/> */}
      {/* <ImperativeParent/> */}
      {/* <UseIDComponent/>
      <UseIDComponent/> */}
      {/* <UseTransitionExample/> */}
      {/* <UseDefferedValueComponent/> */}
      {/* <FilterSearch/> */}
      {/* <UseMemoExample/> */}
      {/* <SearchFilterDebounce/> */}
      {/* <Pagination/> */}
      {/* <UseMemoOptimzation/> */}
      {/* <CallbackMemo/> */}
      <Todo/>
    </>
  );
}

export default App;
