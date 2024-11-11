import FlowApp from '@/Flow/FlowApp.tsx';
import { Provider } from 'react-redux';
import './App.scss';
import { store } from './app/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <FlowApp />
      </Provider>
    </>
  );
}

export default App;
