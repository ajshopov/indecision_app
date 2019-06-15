import React from "react";
import AddOption from "./AddOption";
import Options from "./Options";
import Action from "./Action";
import Header from "./Header";

export default class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options: options }))
            }
        } catch (e) {
            // do nothing if error, will fall back to empty array
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            console.log('saving data');
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {
        console.log('unmount');
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handlePick() {
        const randomNum = Math.floor(this.state.options.length * Math.random());
        alert(this.state.options[randomNum]);
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'Duplicate';
        }
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter(option => option !== optionToRemove)
        }));
    }
    render() {
        const subtitle = "Afraid of choosing?";

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}