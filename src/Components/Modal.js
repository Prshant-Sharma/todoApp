import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

function Modals(){
    const[user, setUser] = useState([{userName: '', age: ''}]);

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  const handleAdd = () => {
    let items = [];
    let itemsData = JSON.parse(localStorage.getItem('data'));
    if(itemsData === null) {
        let obj = {};
        obj['name'] = user.userName;
        obj['age'] = user.age;
        if(obj['age'] === undefined) {
            alert('Please enter age');
            return;
        }
        items.push(obj);
        localStorage.setItem('data', JSON.stringify(items));
    } 
    else {
        let names = itemsData.map(item => item.name.toLowerCase());
        if(names.indexOf(user.userName.toLowerCase()) >= 0) {
            alert('Name already exist!');
            return;
        }
        let obj = {};
        obj['name'] = user.userName;
        obj['age'] = user.age; 
        if(obj['age'] === undefined) {
            alert('Please enter age');
            return;
        }
        itemsData.push(obj);
        localStorage.setItem('data', JSON.stringify(itemsData));
    }
  }

    return (
      <div>
        <button onClick={openModal}>Add item</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Add</h2>
          <button onClick={closeModal}>close</button>
          <form>
            <input type="text" placeholder="Enter item to add" value={user.userName} onChange={e => setUser({...user, userName: e.target.value})}></input>
            <input type="text" placeholder="Enter age" value={user.age} onChange={e => setUser({...user, age: e.target.value})}></input>
            <button onClick={handleAdd}>Add</button>
          </form>
        </Modal>
      </div>
    );
}

export default Modals