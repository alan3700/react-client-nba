import React, { useState, useEffect, useContext  } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../UserContext";
function Accueil(props) {

const user = useContext(UserContext);
const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <div className="Accueil">
      <h2>Accueil</h2>
    </div>
  );
}

export default Accueil;