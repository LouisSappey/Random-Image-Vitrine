import React from 'react';
import {Container, Image,  Navbar, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import './css/RandomImage.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand style={{ marginLeft: '1rem', marginRight: 'auto' }}>Bienvenue {localStorage.getItem('username')} !</Navbar.Brand>
      <Button variant="outline-danger" onClick={handleLogout} style={{ marginRight: '1rem' }}>
        Déconnexion
      </Button>
    </Navbar>
  );
};

const RandomImage = () => {
    const [imageUrl, setImageUrl] = useState('');
  
    const handleShare = (platform) => {
      const port = window.location.port;
      const message = `Hey! ${localStorage.getItem('username')} has discovered this picture: ${imageUrl} thanks to our app on port ${port}! Come try it yourself!`;      switch (platform) {
        case 'clipboard':
          navigator.clipboard.writeText(message)
            .then(() => alert('Texte copié dans le presse-papier!'))
            .catch(err => console.error('Erreur lors de la copie dans le presse-papier', err));
          break;
        case 'whatsapp':
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          break;
        case 'instagram':
            const instagramUrl = `https://www.instagram.com/`;
            window.open(instagramUrl, '_blank');
            break;
        case 'twitter':
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
            window.open(twitterUrl, '_blank');
            break;
        default:
          break;
      }
    };

  const fetchRandomImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    } catch (error) {
      console.error('Erreur lors de la récupération de l’image', error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div>
      <Header />
      <Container className="mt-4 text-center flex-container">
        <Image src={Logo} width={"10%"} height={"auto"} alt="Logo" fluid roundedCircle style={{marginBottom: 20}} />
        <Button onClick={fetchRandomImage}>Rafraîchir l’image</Button>
        {imageUrl && <Image src={imageUrl} width={"100%"} height={"auto"} alt="Random Dog" className="mt-3" fluid rounded  />}
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{marginBottom: 20, marginTop: 20}}>
            Partager
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleShare('clipboard')}>Copier dans le presse-papier</Dropdown.Item>
            <Dropdown.Item onClick={() => handleShare('whatsapp')}>Partager sur WhatsApp</Dropdown.Item>
            <Dropdown.Item onClick={() => handleShare('instagram')}>Partager sur Instagram</Dropdown.Item>
            <Dropdown.Item onClick={() => handleShare('twitter')}>Partager sur X (Ex Twitter)</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </div>
  );
};

export default RandomImage;
