import React from 'react';
import '../Styles/home.css';
import Homeh from '../Images/homepageimg.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            suggestions: [],
            text:'',
            restaurants:[]
        }
    }

    onTextChange = (e) => {
        const value = e.target.value;
        const { restaurants } = this.state;
        let suggestions = [];

        if(value.length > 0) {
            suggestions = restaurants.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        }
        this.setState(() => ({
            suggestions,
            text:value
        }))
    }

    selectedText(value) {
        this.setState({
            text:value.name,
            suggestions:[],
        }, () => {
            this.props.history.push(`/restaurantdetailspage/?restaurant=${value._id}`);
        })
    }

    renderSuggestions = () =>{
        let { suggestions } = this.state;

        if(suggestions.length === 0) {
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item,index) => ( <li key ={index} onClick = {() => this.selectedText(item)}
                    style={{color: 'black',
                        listStyle: 'none',
                        position: 'relative',
                        top: '50px',
                        left: '-43%',
                        backgroundColor: 'aliceblue',
                        backgroundImage: 'linear-gradient(90deg, yellow 10px ,#eee 10px,#eee 11px, transparent 11px)',
                        marginBottom: '5px',
                        boxSizing: 'border-boxorder-box',
                        cursor: 'pointer',
                        borderRadius: '9px',
                        border: '1px solid black',
                        boxShadow: '0 3px 6px 0 rgba(255, 255, 255, 0.5)',
                        padding: '10px 15px 10px 25px',
                        height: '50px',
                        width: '54%',
                        zIndex: '1',
                        marginLeft: '76%',
                        fontStyle: 'italic'}}>{`${item.name},${item.city}`}</li>))
                }
            </ul>
        );
    }
        handlechange = (event) => {
            const area = event.target.value.split('-')[0];
            const city = event.target.value.split('-')[1];

            sessionStorage.setItem('area',area);
            sessionStorage.setItem('city',city);

            axios({
                method:'GET',
                url:`http://localhost:6503/api/getRestaurantsbycity/${area}`,
                headers: { 'content-type': 'application/json'}
            }).then(res => this.setState({restaurants:res.data.restaurantList}))
            .catch(err => console.log(err))

        }
    render() {
        const {locations} =this.props;
        const { text } = this.state;
        return(
            <div>
                <img src={Homeh} 
                style={{ width:'100%', height:'450px', margin:'auto'}} />
    <div>
        <div className="logo">
            <p>e!</p>
        </div>
        <div className="headings">
            Find the best restaurants, cafes, bars
        </div>
        <div className="locationSelector">
            <select className="locationDropdown" onChange={this.handlechange}>
                <option value="0" selected disabled>Please select a city</option>
                {locations.map((item,index)=>{
                    return <option key={index} value={`${item.location_id}-${item.city_id}`}>{`${item.name},${item.city}`}</option>
                })}
            </select>
                <div className ="notebooks"></div>
                <div>
                    <input id ="query" className ="restaurantsinput" type="text" onChange={this.onTextChange} value={text} placeholder="Please Enter Restaurant Name" />
                    {this.renderSuggestions()}
                    <span className="glyphicon glyphicon-search search"></span>
                </div>
        </div>
    </div>
    </div>

        )
    }
    
}

export default withRouter(Wallpaper);