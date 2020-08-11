import React from 'react';
import './App.css';
import Blockchain from './Blockchain';
import { loadJson } from './utils';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Hash from './Hash'


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
      <Container fluid>
        <Row className="justify-content-end">
          <Col>
            <h1> My Blockchain</h1>
          </Col>
          <Col className="col-md-3">
            <Hash></Hash>
          </Col>
        </Row>
        <Blockchain mining={this.state.mining} />
        <button disabled={this.state.mining} className="btn btn-primary" onClick={this.handleMine} >
          {this.state.mining? <Spinner as="span" animation="border" size="sm" /> : null}
           Mine
        </button>
      </Container>
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
