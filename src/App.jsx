// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Popup from './components/Popup';
// import EditorPage from './components/EditorPage';

// const App = () => {
//   const [username, setUsername] = useState(null);

//   const handleNameSubmit = (name) => {
//     setUsername(name);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             username ? (
//               <EditorPage username={username} />
//             ) : (
//               <>
//                 <Home />
//                 <Popup onSubmit={handleNameSubmit} />
//               </>
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ConnectPopup from './components/ConnectPopup';
import EditorPage from './components/EditorPage';

const App = () => {
  const [username, setUsername] = useState(null);

  const handleNameSubmit = (name) => {
    setUsername(name);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/connect" 
          element={
            username ? (
              <Navigate to="/editor" replace />
            ) : (
              <ConnectPopup onSubmit={handleNameSubmit} />
            )
          } 
        />
        <Route 
          path="/editor" 
          element={
            username ? (
              <EditorPage username={username} />
            ) : (
              <Navigate to="/connect" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;