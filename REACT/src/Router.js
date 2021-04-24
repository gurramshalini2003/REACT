import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Filter from './Components/Filter';
import Details from './Components/Details';


const Router = () => {
    return(
          <BrowserRouter>
                <Header />
                <Route exact path ="/" component={Home} />
                <Route path ="/restaurantsearchpage" component={Filter} />
                <Route path ="/restaurantdetailspage" component={Details} />
              </BrowserRouter>
    )
}

export default Router;