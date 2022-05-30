import logo from './logo.svg';
import './App.css';
import Form from './components/form/Form';
import Form2 from './components/form2/Form2';

function App() {
  return (<>
  <button onClick={(e)=>{console.log("clicked"); e.preventDefault()}} onContextMenu={(e)=>{console.log("rihgt")}}>click</button>
  <Form></Form>
  <Form2/>
  </>
  );
}

export default App;
