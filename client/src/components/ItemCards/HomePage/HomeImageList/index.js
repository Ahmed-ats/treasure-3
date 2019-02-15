import React from 'react';
import HomeImageCard from '../HomeImageCard'
import '../HomeImageList/index.css'

const HomeImageList = (props) => {
     
    var Image = props.users.map(user => {
       
        return <HomeImageCard
        user={user.username}
        items={user.items}
        getId={props.getId}
        searchQuery={props.searchQuery}
        />
    })
    return(
        <div className="card-columns">
          {Image}
        </div>
    )
};

export default HomeImageList;