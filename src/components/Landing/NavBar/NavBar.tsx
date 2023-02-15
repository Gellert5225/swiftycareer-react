import React, { useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
 
import Logo from '../../../images/uniplus.png'
import './NavBar.css'

const NavBar = () => {
	const [showLogin, setShowLogin] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

	const handleLogin = async () => {
		fetch(`http://${process.env.REACT_APP_SERVER_URL}/users/signin`, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({ username: username, password: password }),
			headers:{          
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(async res => {
			const isJson = res.headers.get('content-type')?.includes('application/json');
			const data = isJson && await res.json();

			if (!res.ok) {
					const error = (data && data.error) || res.status;
					return Promise.reject(error);
			}
		}).catch(error => {
			console.error('There was an error!', error);
		});
	}

	return (
		<>
			<Navbar className="nav-landing" variant="dark">
				<Container>
					<Navbar.Brand href="/">
						<img alt="" src={Logo} width="60" height="60" className="d-inline-block align-middle" />
						<span className="nav-brand">Swifty Career</span>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<ul className="navbar-ul" id="loginul">
							<li className="navbar-li" onClick={handleShowLogin} style={{marginRight: '10px'}}>Login</li>
							<li className="navbar-li">Sign Up</li>
						</ul>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Modal show={showLogin} onHide={handleCloseLogin} backdrop="static" keyboard={false} aria-hidden='true'>
				<Modal.Header>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form >
						<Form.Group className='form-group'>
							<Form.Control 
								className='form-control-login' 
								type="text" 
								placeholder="Username" 
								value={username} 
								onChange={e => setUsername(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='form-group'>
							<Form.Control 
								className='form-control-login' 
								type="text" 
								placeholder="Password"
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</Form.Group>
					</Form>
					<Modal.Footer className='modal-footer'>
						<Button variant="secondary" className='login-close' onClick={handleCloseLogin}>
							Close
						</Button>
						<Button variant="primary" type='submit' className='login-submit' onClick={handleLogin}>Login</Button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default NavBar;