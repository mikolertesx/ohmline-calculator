import { Metadata } from 'next';

// Required for material UI.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './styles.css';

import MainView from '../views/MainView/main-view';
import TrpcWrapper from './trpcWrapper';

export const metadata: Metadata = {
  title: 'Ohmline Calculator',
  authors: [{
    name: 'Miguel Angel Guerrero Salinas',
    url: 'www.mgangsal.com'
  }]
};

export function App() {
  return (
    <TrpcWrapper>
      <div>
        <MainView />
      </div>
    </TrpcWrapper>
  );
}

export default App;
