import React, {Component} from 'react'
import {ApplicationContext} from './Context';

export class ApplicationContextProvider extends Component {
    state = {
        openAiKey: ''
    };

    render() {
        return (
            <ApplicationContext.Provider
                value={{
                    openAiKey: this.state.openAiKey,
                    setOpenAiKey: key => {
                        console.log('Set Open AI key called for', key);
                        this.setState({
                            openAiKey: key
                        });
                    },
                }}
            >
                {this.props.children}
            </ApplicationContext.Provider>
        );
    }
}