import React from "react";
import "./App.css";
import Logo from "./Logo";

const Header = ({base, setBase, exportHandler, importHandler}) => {

    const headerStyle = {
        fontSize: "1em",
    }

    return (
        <div className='header'>
            <Logo />
            <div className={'base'}>
                <span className={'baseLabel'}>Base: </span>
                <input className={'baseInput'} type="text" value={base} onChange={(e) => setBase(e.target.value)} onFocus={(e) => setBase(e.target.value)} />
                <button className={'baseButton'} onClick={() => setBase(base)}>Change</button>
            </div>
            <button className={'importButton'} onClick={() => importHandler()}>Import</button>
            <button className={'exportButton'} onClick={() => exportHandler()}>Export</button>
        </div>
    );
}

export default Header;