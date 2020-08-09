import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {loadJson} from './utils';


function Block(props: { text: string }): JSX.Element {
    return (
        <div className="block">{props.text}</div>
    );
}

class Blockchain extends React.Component<{mining: boolean},{blocks: any[], mining: boolean}> {
    constructor(props: any) {
        super(props);
        this.state = {
            mining: false,
            blocks: [],
        };
    }

    
    render() {
        const elements: JSX.Element[] = [];
        const { blocks } = this.state;
        for (let i = 0; i < blocks.length; i++) {
            elements.push(
                <Block key={blocks[i]["index"].toString()} text={blocks[i]["index"].toString()}></Block>
            )
        }


        return (
            <div className="BlockChain">
                <Container>
                    <Row>
                        {elements}
                    </Row>
                </Container>
            </div>
        )
    }

    refreshChain(){
        loadJson("/chain").then(data => this.setState({ blocks: data["chain"], mining: this.state.mining}));
    }

    componentDidMount() {
        this.refreshChain();
    }

    componentWillReceiveProps(props: any){
        this.refreshChain();
    }

    async fetchAsync(url: string) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
}







export default Blockchain;

