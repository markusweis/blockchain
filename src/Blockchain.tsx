import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { loadJson } from './utils';

interface IBlockProp {
    index: number,
    previous_hash: string,
    proof: number,
    timestamp: number,
    transactions: ITransaction[]
}

interface ITransaction {
    amount: number,
    recepient: string,
    sender: string,
}


function Block(props: IBlockProp): JSX.Element {
    return (
        <div className="card card-block block">
            <p>Index: {props.index}</p>
            <div className="horizontal-scroll prev-hash" >
                <p>Previous Hash: {props.previous_hash.toString()}</p>
            </div>
            <p>Timestamp: {new Date(props.timestamp * 1000).toLocaleString()}</p>
            <p>Proof of work: {props.proof}</p>
        </div>
    );
}

class Blockchain extends React.Component<{ mining: boolean }, { blocks: IBlockProp[], mining: boolean }> {
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
                <Block {...blocks[i]} key={blocks[i]["index"].toString()} ></Block>
            )
        }


        return (
            <div className="BlockChain horizontal-scroll">
                        {elements}
            </div>
        )
    }

    refreshChain() {
        loadJson("/chain").then(data => this.setState({ blocks: data["chain"], mining: this.state.mining }));
    }

    componentDidMount() {
        this.refreshChain();
    }

    componentWillReceiveProps(props: any) {
        this.refreshChain();
    }

    async fetchAsync(url: string) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }
}







export default Blockchain;

