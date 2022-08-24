import React from "react";
import "./App.css";
import Logo from "./Logo";

const Header = ({base, setBase, exportHandler, importHandler}) => {

    const headerStyle = {
        fontSize: "1.5em",
        fontWeight: "bold",
    }

    return (
        <div className='header'>
            <Logo />
            <div style={headerStyle}>
                <span>Base: </span>
                <input type="text" value={base} onChange={(e) => setBase(e.target.value)} onFocus={(e) => setBase(e.target.value)} />
                <button onClick={() => setBase(base)}>Change</button>
            </div>
            <button onClick={() => exportHandler()}>Export</button>
            <button onClick={() => importHandler()}>Import</button>
        </div>
    );
}

export default Header;