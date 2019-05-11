import React, { Component } from "react";

class Search extends Component {
    searchRef = React.createRef();
    search = e => {
        e.preventDefault();
        this.props.search(this.searchRef.current.value);
    };
    render() {
        const style = {
            margin: "0 0 15px 0"
        };
        return (
            <div className="justify-content-center searchbar" style={style}>
                <h4 className="control-label text-center">Search</h4>
                <input
                    autoFocus
                    maxLength="40"
                    className="form-control"
                    onChange={this.search}
                    ref={this.searchRef}
                    type="text"
                    placeholder="Type your search"
                    value={this.props.currentValue}
                />
            </div>
        );
    }
}

export default Search;
