/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

function Footer() {
  const footerStyle = {
    margin: '20px 0'
  };
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-muted" style={footerStyle}>Made with <span style={{color: '#C70505'}}>♥</span> by Balazs Sarvari</p>
      </div>
    </footer>
  );
}

export default Footer;
