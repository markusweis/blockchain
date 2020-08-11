import { sha256 } from 'js-sha256';
import React from 'react';
import Card from 'react-bootstrap/Card';

console.log(sha256("test"));


function Hash(props: any): JSX.Element {
    return (
        <div className="hash-container">
            <Card>
                <HashForm></HashForm>
            </Card>
        </div>
    )
}


class HashForm extends React.Component<{},{value:string}> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event:any){
        this.setState({value: event.target.value})
    }

    render() {
        return (
            <div className="hash-input">
                <form>
                    <label>
                        Input:
                        <input type="text" value={this.state.value} onChange={this.handleChange} className="hash-input"/>
                    </label>
                </form>
                <hr/>
                <p>
                    {sha256(this.state.value)}
                </p>
            </div>
        );
    }
}

export default Hash;