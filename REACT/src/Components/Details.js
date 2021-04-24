import React from 'react';     
import axios from 'axios';
import Breakfast from '../Images/breakfast.jpg';      
import { Carousel } from 'react-responsive-carousel';     
import Modal from 'react-modal';                           
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Styles/details.css';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'white',
        border: 'solid 2px black',
        width: '65%',
        height: '70%'
    }
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            loginModalIsOpen: false,
        }
    }

    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const restaurantId = queryParams.restaurant;
        axios({
            method: 'GET',
            url: `http://localhost:6503/api/getResById/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => this.setState({ restaurant: res.data.restaurant }))
            .catch(err => console.log(err))   
    }

    handleGallery = () => {
        this.setState({ loginModalIsOpen: true });
    }

    handleClose = () => {
        this.setState({ loginModalIsOpen: false });
    }

    render() {
        const { ItemModalIsOpen, restaurant, loginModalIsOpen , Item } = this.state;
        return (
            <div>
                {restaurant != null ?
                    < React.Fragment >
                        <div>
                            {restaurant.thumb && <img src={Breakfast} width="100%" height="500px" />}
                            <button className="gallery-button" onClick={this.handleGallery}>Click to see Image Gallery</button>
                        </div>
                        <div className="heading">{restaurant.name}</div>
                        <div className="tabs">
                            {/* Tab-1 */}
                            <div className="tab">
                                <input type="radio" id="tab-1" name="tab-group-1" checked />
                                <label for="tab-1">Overview</label>

                                <div className="content">
                                    <div className="about">About the place</div>
                                    <div className="head">Cuisine</div>
                                    <div className="value">{restaurant.cuisine && restaurant.cuisine.map((item) => item.name + ', ')}</div>
                                    <div className="head">Average Cost</div>
                                    <div className="value">&#8377; {restaurant.min_price}</div>
                                </div>
                            </div>
                            {/* Tab-2 */}
                            <div className="tab">
                                <input type="radio" id="tab-2" name="tab-group-1" />
                                <label for="tab-2">Contact</label>
                                <div className="content">
                                    <div className="head">Phone Number</div>
                                    <div className="value">{restaurant.contact_number}</div>
                                    <div className="head">{restaurant.name}</div>
                                    <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                                </div>
                            </div>
                        </div>
                        <Modal
                            isOpen={loginModalIsOpen}
                            style={customStyles}
                        >
                            <div>
                                <button className="btn btn-sm btn-warning" style={{ float: 'right' }} onClick={this.handleClose}>Close</button>
                                <Carousel showThumbs={false}>
                                    {restaurant && restaurant.thumb && restaurant.thumb.map((item) => {
                                        return <div>
                                            <img src={require('../' + item)} />
                                        </div>
                                    })}
                                </Carousel>
                            </div>
                        </Modal>
                    </React.Fragment> : null
                }
            </div>
        )
    }
}

export default withRouter(Details); 