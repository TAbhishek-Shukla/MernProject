import React from 'react';
import { NavLink } from 'react-router-dom';
import "../App.css"
const Errorpage = () => {
  return (
    <>
    <div id='notfound'>
        <div className='notfound'>
            <div className='notfound-404'>
                <h1>404</h1>
            </div>
            <h2>WE ARE SORRY, PAGE NOT FOUND</h2>
            <p className='mb-5'>
              THE PAGE YOU AVE BENN LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME CHANGED OR IS TEMPORARILY UNAVALAIBLE
            </p>
            <NavLink className="btn btn-primary  err-btn"  to="/">Back To HomePage</NavLink>
        </div>
    </div>
    </>
  );
}

export default Errorpage;
