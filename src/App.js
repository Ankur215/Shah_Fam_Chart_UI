import './App.css';
import MemberForm from './components/MemberForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shah Family Chart</h1>
        <p>Add a new family member</p>
      </header>
      <main>
        <MemberForm />
      </main>
    </div>
  );
}

export default App;
