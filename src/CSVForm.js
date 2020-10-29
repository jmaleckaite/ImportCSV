import React, { useState } from 'react';
import { Button, Header, Icon, Message, Checkbox, Form, Modal, 
  Segment, Menu, Grid, Image, Input, Table, Search, Radio } from 'semantic-ui-react';
  import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom'; 
  import 'semantic-ui-css/semantic.min.css';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

 
function CSVForm() {
 
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [radioState, setRadioState] = useState(false);

  const handleChange = () => {
    setRadioState(!radioState)
  }

 

  // process CSV data
  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
 
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }
 
        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
 
    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));
 
    setData(list);
    setColumns(columns);
  }

 
 
  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }

  
  
  return (
    <div>
      <Grid centered columns={2}>
    <Grid.Column>
	<div class="ui fluid form segment">
      <Form onSubmit={(e) => {e.preventDefault(); alert('CSV file imported')}}>
      <Header as="h3" color="blue">Import CSV file</Header>
      <Form.Field inline
            control={Input}
            label='Tipo di dati'
            placeholder='Utenti'
			      readOnly
          />
          <Form.Field inline
		  control={Input}
		  label='Campi'
		  placeholder='id, email, active, user_type, channel'
		  readOnly
		  />
       <Form.Group inline>
          <label>Duplicati</label>
          <Form.Field
            control={Radio}
            label='Ignore'
            value="ignore"

          />
          <Form.Field
            control={Radio}
            label='Replace'
            value="replace"
            checked={radioState}
            onClick={handleChange}
          />
        </Form.Group>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
      <Form.Button color="blue" type="submit">Import</Form.Button>
      </Form>
      </div>
      </Grid.Column>.
      </Grid>
    </div>
  );
}

function useRadioButton(name) {
  const [value, setState] = useState(null);

  const handleChange = e => {
    setState(e.target.value);
  };

  const inputProp = {
    name, 
    type:"radio",
    onChange: handleChange
  };

  return [value, inputProp];
}
 
export default CSVForm;