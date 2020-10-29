import React from 'react';
import { Button, Header, Icon, Message, Checkbox, Form, Modal, 
Segment, Menu, Grid, Image, Text } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route, NavLink, Link } from 'react-router-dom'; 
import 'semantic-ui-css/semantic.min.css';
import CSVForm from './CSVForm';



class App extends React.Component {
	
	render() {
		return (
		<div className="wrapper">
		<Form>
		<BrowserRouter>
		<Button as={Link} to='/CSVForm' size='large' icon='file'>Import CSV degli utenti</Button>
		<Switch>
		<Route path="/CSVForm">
		<CSVForm />
		</Route>
		</Switch>
		</BrowserRouter>
		</Form>
		</div>
		);
	}
	
	
	
	}




	
	







export default App;
