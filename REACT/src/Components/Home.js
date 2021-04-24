import React from 'react';
import '../Styles/home.css';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';


class Home extends React.Component{
    constructor() {
        super();
        this.state = {
            locations:[],
            mealtypes:[]
        }
    }
    componentDidMount () {
        sessionStorage.setItem('area',undefined);
        sessionStorage.setItem('city',undefined);
        axios({
           method:'GET',
           url:'http://localhost:6503/api/cityList',
           headers:{'content-type': 'application/json'}
        }).then(response => this.setState({ locations: response.data.city }))
           .catch(err => console.log(err))
           axios({
            method:'GET',
            url:'http://localhost:6503/api/mealtype',
            headers:{'content-type':'application/json'} 
         }).then(response => this.setState({mealtypes:response.data.mealtype}))
         .catch(err => console.log(err))
     }  
     render() {
        const { locations,mealtypes} = this.state;
        return(
            <React.Fragment>
                <Wallpaper locations={locations} />
                <QuickSearch mealtypes={mealtypes} />
            </React.Fragment>
        )
    }
}

export default Home;  