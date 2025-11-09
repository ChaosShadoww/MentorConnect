//import React from 'react';
import BoxesBar from '../components/BoxesBar';


function MenteeHome() {
  return (
  <div>
    <header className="header">
      <h1>Mentee HomePage</h1>
    </header>

    <div id="Bar-Section" style={{ padding: '0 16px' }}>
        <h2> Mentors </h2>
        <BoxesBar onCardClick={(m) => console.log('Clicked on:', m.name)} />
    </div>

    <div id="Chat-Section">
      <h2>Chats: </h2>
      <h3>Active Chats</h3>
      <h3>Inactive Chats</h3>

    </div>
  </div>
  )
}

export default MenteeHome
