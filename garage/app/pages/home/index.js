/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Garage from '../../components/Garage';
import s from './styles.css';

class HomePage extends React.Component {

/*
  static propTypes = {
    articles: PropTypes.array.isRequired,
  };
*/

  componentDidMount() {
    document.title = 'Garage';
  }

  render() {
    return (
      <div>
        <h2>Garage</h2>
        <p><strong>Goal</strong>: Unblock the yellow car and move it to the exit.</p>
        <ul>
          <li><strong>Select car</strong>: mouse click, arrow keys</li>
          <li><strong>Move selected car</strong>: Shift + arrow keys</li>
        </ul>
        <Garage />
      </div>
    );
  }

}

export default HomePage;
