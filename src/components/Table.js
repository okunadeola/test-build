import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import './Table.css'
import axios from 'axios'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setData } from "../actions/userData";

export default function Table() {

  const [searchCustomer, setSearchCustomer] = useState('')
  const dispatch = useDispatch()
  const customerData = useSelector(state => state.userData.data)
  const [data, setdata] = useState('');


  // adding explicit (id) to data
  const renewData = (data) => {
    let n = 1
    let newData

    if (data) {
      newData = data.map(info => {
        info["id"] = n++
        return info
      })
    } else {
      newData = customerData.map(info => {
        info["id"] = n++
        return info
      })

    }
    setdata(newData)
  }




  useEffect(() => {
    loadData()
  }, [])


  // table api call
  const loadData = () => {
    axios.post("https://api-collections.creditclan.com/api/v2/account/dashboard").then(data => {
      dispatch(setData(data.data.loans))
      renewData(data.data.loans);
    })
  }


  const search = () => {
    if (!searchCustomer) loadData()
    setdata(data.filter((item) => item["LEGAL_NAME"] === searchCustomer));
  }

  const handlePress = (e) => {
    if (searchCustomer === '') {
      loadData()
    }
    setSearchCustomer(e.target.value)
  }


  const handleDelete = (id) => {
    setdata(data.filter((item) => item.id !== id));
  };


  // table row-column setup
  const columns = [
    {
      field: "PEOPLE_ID",
      headerName: "ID",
      width: 100,
    },
    {
      field: "LEGAL_NAME",
      headerName: "Customer",
      width: 270,
    },
    { field: "REQUEST_PRINCIPAL", headerName: "Amount", width: 150 },
    {
      field: "REQUEST_TENOR",
      headerName: "Duration",
      width: 160,
    },
    {
      field: "DATE_ADDED",
      headerName: "Date Added",
      width: 200,
    },
    {
      field: "LOAN_STATUS",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          < >
            <div className="loanStatus">
              <span>1/{params.row["LOAN_STATUS"]} </span>
              <progress id="progress" value={(1 / params.row["LOAN_STATUS"]) * 100} max="100"></progress>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button className="productListEdit">Edit</button>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (

    <>
      {data && (
        <div className="size">
          <div className="inputBtnContainer">
            <input type="text" value={searchCustomer} name={searchCustomer} placeholder="Search Customers..." onChange={handlePress} />
            <div className="searchBtn" onClick={search}>
              <i className="fa fa-search"></i>
            </div>
          </div>
          <DataGrid autoHeight
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            checkboxSelection
            className="MuiDataGrid-row"
          />
        </div>
      )}
    </>

  );
}