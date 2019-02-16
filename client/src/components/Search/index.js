import React, { Component } from 'react';


// Search route will comb through itemName and itemDescription

// POSSIBLE SOLUTION IS TO CREATE NEW BACKEND ROUTE THAT CONDITIONALLY POPULATES USERS BASED ON SEARCH PARAMETER
//INITIAL SEARCH PARAMETER FILTERS ALL ITEMS THAT MATCH CRIETERA THEN DB.USER.FINDALL.POPULATE
// OR add filter as props in homeimage card


class Search extends Component {
    state = {

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        
    };


    render() {
        return (
            <div>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" 
                    type="text" 
                    placeholder="Search" 
                    name="search"
                    id="search"
                    onChange={this.handleChange} 
                    />
                    <button className="btn btn-secondary" type="button" 
                    onClick={() =>{
                        this.props.handleSearchSubmit(this.state.search);
                        this.setState({
                            search: ''
                        })
                    }}
                    >Search</button>
                </form>
            </div>

        )
    }
}

export default Search;