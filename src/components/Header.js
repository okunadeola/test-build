import React from 'react'
import "./Header.css"



function Header() {
  return (
    <div>
      <div className="head"> Collection requests</div>
      <div className="card-wrapper">
        <div className="cards">
          <div className="icon1">
            <i className="fas fa-paste paste"></i>
          </div>
          <div>
            <span className="top">1479</span><br /> <span className="grey">Total Pending</span>
          </div>
        </div>
        <div className="cards ml-5">
          <div className="icon2">
            <span className="cancelledIcon">&times;</span>
          </div>
          <div>
          <span className="top">491</span> <br /><span className="grey"> Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
