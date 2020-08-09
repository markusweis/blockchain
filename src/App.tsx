import React from 'react';
import './App.css';
import Blockchain from './Blockchain';
import { loadJson } from './utils';


class App extends React.Component<{}, { mining: boolean, message: string, miningLabel: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      message: "",
      mining: false,
      miningLabel: "Not Mining"
    }
  }

  render() {
    return (
      <div>
        <Blockchain mining={this.state.mining} />
        <button disabled={this.state.mining} className="btn btn-primary" onClick={this.handleMine} >Mine</button>
        <p>MiningLabel? {this.state.miningLabel}</p>
        <p>Mining? {this.state.mining.toString()}</p>
        <p>{this.state.message}</p>
      </div>
    );
  }



  handleMine = () => {
    this.setState({ miningLabel: "Mining", mining: true });
    loadJson('/mine').then(data => this.setState({
      mining: false,
      message: data["message"] + " id: " + data["index"],
      miningLabel: "Finished"
    }));
  };

}

export default App;
