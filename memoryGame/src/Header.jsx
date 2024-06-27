import React from 'react';

function Header({score, bestScore}) {


    return (
      <div className="header">
        <div class="title">
        <h1>Dragon Ball Memory</h1>

        </div>

        <div>
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </div>

      </div>
    );
  }

  export default Header;
