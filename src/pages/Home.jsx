import React, { useState, useContext, useEffect } from 'react';
import { Web5Context } from '../context/Web5Context';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { web5, did } = useContext(Web5Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);
  const names = ['John', 'Jane', 'Bob', 'Alice'];

  useEffect(() => {
    if (did) {
      console.log('The DID: ', did);
    }
  }, [web5, did]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (name) => {
    setSelectedNames((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((selectedName) => selectedName !== name)
        : [...prevSelected, name]
    );
  };

  const handleSignIn = () => {
    // Navigate to the Dashboard and pass did and web5 as props
    navigate('/dashboard');
    handleCloseModal();
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>

      <button onClick={handleOpenModal}>Onboard</button>

      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} contentLabel="Onboard Modal">
        <h2>Choose Names</h2>
        <form>
          {names.map((name) => (
            <div key={name}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedNames.includes(name)}
                  onChange={() => handleCheckboxChange(name)}
                />
                {name}
              </label>
            </div>
          ))}
        </form>
        <button onClick={handleSignIn}>Sign In</button>
      </Modal>
    </div>
  );
};

export default HomePage;
