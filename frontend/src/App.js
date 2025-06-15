import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './store';
import Route from '../src/main/route';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container main-container">
        <ToastContainer pauseOnFocusLoss={false} />
        <Route />
      </div>
    </Provider>
  );
};

export default App;
