import React from 'react'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import getWord from '../service/WordService'
import DataTables from "react-data-table-component";
import moment from 'moment'

const Word = () => {
  const [words, setWords] = useState([])
  const [search, setSearch] = useState('')
  const [filteredWord, setFilteredWord] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWord();
        setWords(data);
        setFilteredWord(data); // Khởi tạo filteredCountries với tất cả các quốc gia
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    const result = words.filter((word) => {
      return word.word.toLowerCase().match(search.toLowerCase());
    });
    setFilteredWord(result);
  }, [search]);

  const column = [
    { name: "STT", selector: (row, index) => index + 1, sortable: true, grow: 0 },
    // { name: "Date", selector:(row) =>{
    //     const currentDate = new Date();
    //     const day = String(currentDate.getDate()).padStart(2, '0');
    //     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    //     const year = currentDate.getFullYear();
    //     return `${day}/${month}/${year}`; 
    //   },  sortable: true
    // },
    { name: "Date", selector: (row) => row.date, sortable: true, },
    { name: "Date2", selector: (row) => row.date, sortable: true, },
    { name: "Word", selector: (row) => row.word, sortable: true, },
    { name: "Meaning", selector: (row) => row.meaning, sortable: true },
    { name: "Description", selector: (row) => row.note, sortable: true },
    { name: "User Edit status", selector: (row) => row.user_add, sortable: true },
    {
      name: "Image",
      selector: (row) => <img src={row.image[0]} width={25} height={25} />,
    },
    // {
    //   name: "Edit",
    //   cell: (row) => (
    //     <button
    //       className="btn btn-success"
    //       onClick={() => {
    //         alert(row.name);
    //       }}
    //     >
    //       Edit
    //     </button>
    //   ),
    // },
    // {
    //   name: "Delete",
    //   cell: (row) => <button className="btn btn-warning">Delete</button>,
    // },
    {name: "Subject", selector:(row) => row.subject, sortable: true}
  ];

  return (
    <DataTables
      title="WEB Từ Điển"
      columns={column}
      data={filteredWord}
      pagination
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here now"
          className="w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};

export default Word;
