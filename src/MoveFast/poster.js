/**
 * I want to make an Airbnb poster and figured it would be easier to just design
 * it in js
 */

import "./poster.css";

function App() {
  return (
    <div className="fb-poster">
      <div>
        Move
        <br />
        fast and
        <br />
        break things.
      </div>
      <div>
        <svg fill="none" viewBox="0 0 500 500" className="fb-logo">
          <path
            fill="currentColor"
            d="m500,250C500,111.93,388.07,0,250,0S0,111.93,0,250c0,117.24,80.72,215.62,189.61,242.64v-166.24h-51.55v-76.4h51.55v-32.92c0-85.09,38.51-124.53,122.05-124.53,15.84,0,43.17,3.11,54.35,6.21v69.25c-5.9-.62-16.15-.93-28.88-.93-40.99,0-56.83,15.53-56.83,55.9v27.02h81.66l-14.03,76.4h-67.63v171.77c123.77-14.95,219.7-120.35,219.7-248.17Z"
          ></path>
          <path
            fill="none"
            d="m347.92,326.4l14.03-76.4h-81.66v-27.02c0-40.37,15.84-55.9,56.83-55.9,12.73,0,22.98.31,28.88.93v-69.25c-11.18-3.11-38.51-6.21-54.35-6.21-83.54,0-122.05,39.44-122.05,124.53v32.92h-51.55v76.4h51.55v166.24c19.34,4.8,39.57,7.36,60.39,7.36,10.25,0,20.36-.63,30.29-1.83v-171.77h67.64Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default App;
