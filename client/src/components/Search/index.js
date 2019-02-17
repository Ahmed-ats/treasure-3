import React, { Component } from 'react';
import API from '../../utils/API'


// Search route will comb through itemName and itemDescription

// POSSIBLE SOLUTION IS TO CREATE NEW BACKEND ROUTE THAT CONDITIONALLY POPULATES USERS BASED ON SEARCH PARAMETER
//INITIAL SEARCH PARAMETER FILTERS ALL ITEMS THAT MATCH CRIETERA THEN DB.USER.FINDALL.POPULATE
// OR add filter as props in homeimage card
//Best way may be to make a backend route that filters--reset the state to all users if no search is found


class Search extends Component {
    state = {

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        
    };

    checkState = () => {
        API.searchItems(this.state.search)
        .then(res => {
            console.log(res)
        })
    }
    
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

                    <button className="btn btn-primary" type="button"
                    onClick={() =>{
                        this.checkState();
                    }}
                    >Check State</button>
                </form>
            </div>

        )
    }
}

export default Search;