import { useEffect } from 'react';
import './App.css';
import UrlShort from './components/UrlShort';
function App() {
  useEffect(()=>{
    document.title='Url Shortner';
  },[]);
  return (
    <div className="App">
      <div className={'Headdiv'}>
      <h1>Make Short</h1>
      </div>
      <header className="App-header">
        <div className={'fo sideheadings'}>A smarter way to share and store your url</div>
        <div className={'fo2 sideheadings'}>Shorten boost share</div>
        <UrlShort />
      </header>
      
    </div>
  );
}

export default App;
