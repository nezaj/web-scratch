/**
 * I want to make an Airbnb poster and figured it would be easier to just design
 * it in js
 */

import "./poster.css";

function App() {
  return (
    <div className="bjj-poster">
      <div className="bjj-header">
        <div>12 commandments of Jiu-Jitsu</div>
      </div>
      <div className="flex justify-between">
        <div className="bjj-column text-left align-top">
          <div className="bjj-principle">
            1) Be so strong that nothing can disturb your piece of mind
          </div>
          <div className="bjj-principle">
            2) Speak to everyone of happiness, peace & prosperity.
          </div>
          <div className="bjj-principle">
            3) Give all your friends the feeling that they are valuable.
          </div>
          <div className="bjj-principle">
            4) Always look at things from a positive point of view & turn
            positivity into reality.
          </div>
          <div className="bjj-principle">
            5) Think only about the best, work only for the best & always expect
            the best.
          </div>
          <div className="bjj-principle">
            6) Always be as enthusiastic about the success of others as you are
            of your own.
          </div>
        </div>
        <div className="bjj-column text-right">
          <div className="bjj-principle">
            7) Forget about past mistakes and focus your energy on the victories
            ahead.
          </div>
          <div className="bjj-principle">
            8) APPLY THE LARGEST AMOUNT OF YOUR TIME ON SELF-IMPROVEMENT & NO
            TIME CRITICIZING OTHERS.
          </div>
          <div className="bjj-principle">
            9) Always make those around you happy & keep a pleasant attitude to
            all who address you.
          </div>
          <div className="bjj-principle">
            10) Hold a good opinion about yourself and communicate that to the
            world, not through vanity, but benevolence.
          </div>
          <div className="bjj-principle">
            11) Become too stable to feel disturbed, too peaceful to feel anger,
            too confident to feel fear & too content to tumble in adversity.
          </div>
          <div className="bjj-principle">
            12) Believe strongly that the world is on your side, as long as you
            stay loyal to the best of yourself.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
