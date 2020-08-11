import { sha256 } from 'js-sha256';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { loadJson } from './utils';

console.log(sha256("test"));

const validStyle = { backgroundColor: "#77c897" }
const invalidStyle = { backgroundColor: "#8B0000" }


function Hash(props: any): JSX.Element {

    return (
        <div className="hash-container">
            <Card className="hash-card">
                <HashForm></HashForm>
            </Card>
        </div>
    )
}


class HashForm extends React.Component<{}, { value: string, numberzeros: number, valid: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: "",
            numberzeros: 0,
            valid: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
        this.checkValidHash(this.state.value);
    }

    checkValidHash(hash: string) {
        let zeroString = '0'.repeat(this.state.numberzeros);
        let firstCharsHash = sha256(this.state.value).substring(0, this.state.numberzeros);
        console.log(firstCharsHash); //TODO: this is not correct!
        if (firstCharsHash.localeCompare(zeroString) == 0) {
            this.setState({ valid: true })
        }
    }

    componentDidMount() {
        loadJson('/numberzeros').then(data => { this.setState({ numberzeros: data }); });
    }

    render() {
        return (
            <div className="hash-input" style={this.state.valid ? validStyle : invalidStyle}>
                <form>
                    <label>
                        Input:
                        <input type="text" value={this.state.value} onChange={this.handleChange} className="hash-input" />
                    </label>
                </form>
                <p>
                    Leading zeros expected: {this.state.numberzeros}
                </p>
                <hr />
                <p>
                    {sha256(this.state.value)}
                </p>
            </div>
        );
    }
}

export default Hash;