import "semantic-ui-css/semantic.min.css";
import "./reset.css";
import "./common.css";
import Header from "./components/header/Header";
import Section from "./components/section/Section";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Section />
      </Provider>
    </>
  );
}

export default App;
