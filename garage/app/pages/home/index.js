/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Garage from '../../components/Garage';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GameSelector from '../../components/GameSelector';
import s from './styles.css';

export default class GarageApp extends React.Component {
  
  componentDidMount() {
    document.title = 'Garage';
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{maxWidth: '1024px'}}>{/*TODO remove this limitation and adjust the non-interactive garage size for large screens for proper spacing in the GameSelector*/}
          <h4 className={`${s.goal}`}>Unblock the yellow car and move it to the exit</h4>
          <Garage interactive={true}/>
          {/*<GameSelector/>*/}
        </div>
        <Footer/>
      </div>
    );
  }
}