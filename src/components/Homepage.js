import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Image, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css';
import Logo from '../assets/logo.png';
import EyeIcon from '../assets/eye.png';

const Homepage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('username')) {
      navigate('/random-image');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && password) {
      localStorage.setItem('username', username);
      navigate('/random-image');
    } else {
      alert('Veuuillez entrer votre identifiant et votre mot de passe');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="homepage-background">
        <Image src={Logo}width={"10%"} height={"auto"} alt="Logo" fluid roundedCircle />
        <Container className="homepage-container">
          <Row className="justify-content-center align-items-center" style={{width: "100%"}}>
            <Col md={6}>
              <h1 className="text-center mb-4">Bienvenue sur Random Cute Dog !</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Identifiant:</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Entrer votre identifiant" 
                    className="mb-3" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Mot de passe:</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrer votre mot de passe" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility}>
                      <Image src={EyeIcon} width={20} height={20} alt="Toggle visibility" />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <div className="text-center" style={{marginTop: 20}}>
                  <Button variant="primary" type="submit">
                    Se connecter
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default Homepage;
