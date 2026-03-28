import "./App.css";
import Autofill from "./components/Autofill";
import LazyComponent from "./components/lazyLoading/LazyComponent";
import WindowEvent from "./components/lifeCycle/WindowEvent";
import ModalBody from "./components/modal/ModalBody";
import OnlineStatus from "./components/OnlineStatus";
import OTP from "./components/OTP";
import Mainextra from "./components/search/extra/Mainextra";
import MainSearch from "./components/search/Manually/MainSearch";
import MainApp from "./components/search/new/MainApp";
import Rating from "./components/star/Rating";
import Stoper from "./components/Stoper";
import Timer from "./components/Timer";
import Virtualization from "./components/Virtualization";
import VirtualizedList from "./components/VirtualizedList";
import SimpleReducer from "./simpleReducer/SimpleReducer";

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
      <SimpleReducer />
    </>
  );
}

export default App;
