import React from 'react';

function Footer() {
  return (
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col s6 m3">
            <img
              className="materialize-logo"
              src="//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/materialize-logo.png?v=17909639059119771368"
              alt="Materialize"
            />
            <p>Made with love by Materialize.</p>
          </div>
          <div className="col s6 m3">
            <h5>About</h5>
            <ul>
              <li>
                <a href="#!">Blog</a>
              </li>
              <li>
                <a href="#!">Pricing</a>
              </li>
              <li>
                <a href="#!">Docs</a>
              </li>
            </ul>
          </div>
          <div className="col s6 m3">
            <h5>Connect</h5>
            <ul>
              <li>
                <a href="#!">Community</a>
              </li>
              <li>
                <a href="#!">Subscribe</a>
              </li>
              <li>
                <a href="#!">Email</a>
              </li>
            </ul>
          </div>
          <div className="col s6 m3">
            <h5>Contact</h5>
            <ul>
              <li>
                <a href="#!">Twitter</a>
              </li>
              <li>
                <a href="#!">Facebook</a>
              </li>
              <li>
                <a href="#!">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
