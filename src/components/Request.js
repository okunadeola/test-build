import React, { useState } from 'react'
import './Request.css'
import { customersTable } from '../data'
import { NotificationsNone, Search } from '@material-ui/icons'

const Request = () => {
  const [data, setData] = useState(customersTable)
  return (
    <div className="requestWrapper">
      <div className="leftWrapper">
        <div className="requestHeader">
          <div className="left">
            Loan Request
          </div>
          <div className="right">
            Analytic Sort List
          </div>
        </div>

        <div className="requestBody">
          {data && data.map(info => (
            <div className="requestContainer">
              <div className="requestContainerHeader">
                <div>{info.customer}</div>
                <div>-- - --</div>
                <div><i className="fa fa-circle"></i></div>
              </div>
              <div className="requestContainerBox">
                <img src="" alt="img" />
              </div>
              <div className="requestContainerTitle">0.00% Per Months</div>
              <div className="requestContainerFooter">
                <div className="leftSide">
                  <span>1400</span>
                  <span>Requeted</span>
                </div> |
                <div className="leftSide">
                  <span>{info.duration}</span>
                  <span>Days</span>
                </div> |
                <div className="leftSide">
                  <span>0</span>
                  <span>Loan</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rightWrapper">
        <div className="largeBox">
          <span><i className="fa fa-ellipsis-h"></i></span>
          <div className="notification">
            <NotificationsNone className="note" />
            <span class="amount">17.8b</span>
            <span >17452 Requests</span>
          </div>
        </div>
        <div className="smallBox">
          My Account <i className="fa fa-box"></i>
        </div>
        <div className="smallBox search">
          <input id="inpBox" type="text" placeholder="serach"  />
          <Search id="search" style={{ color: 'gray', fontSize: 20 }} />
        </div>
        <div id="last" className="smallBox last">
          <div className="add"><i className="fa fa-plus"></i></div>
          <div class="filter">More Filter Options</div>
        </div>
      </div>
    </div>
  )
}

export default Request
