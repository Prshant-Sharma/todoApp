import React, { useEffect, useState } from 'react'
import SearchItem from './SearchItem';

function ItemList() {
    let [list, setList] = useState([]);
    const [nameToBeUpdate, setNameToUpdate] = useState('');
    const [id, setId] = useState(null);
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        setList(JSON.parse(localStorage.getItem('data')));
    }, [list, showData]);

    const handleDelete = (id) => {
        setList(list.splice(id, 1));
        localStorage.setItem('data', JSON.stringify(list));
        // let dataList = JSON.parse(localStorage.getItem('data'));
        // dataList.splice(id, 1); 
        // localStorage.setItem('data', JSON.stringify(dataList));
    }

    const handleUpdate = (item, id) => {
        setNameToUpdate(item.name);
        setId(id); 
    }

    const handleSave = (id) => {
        let prevData = JSON.parse(localStorage.getItem('data'));
        let objectToBeUpdate = prevData[id];
        objectToBeUpdate['name'] = nameToBeUpdate;
        prevData.splice(id, 1, objectToBeUpdate);
        localStorage.setItem('data', JSON.stringify(prevData));
    } 

    return (
        <div>
            <button onClick={() => setShowData(showData => !showData)}>{showData ? 'Hide data' : 'Show data'}</button>
            {showData ? (list.map((item, index) => {
                return (
                    <div key={index}>
                        <input hidden={id !== index} type="text" defaultValue={nameToBeUpdate} onChange={(e) => setNameToUpdate(e.target.value)}></input>
                        <button disabled={!nameToBeUpdate} hidden={id !== index} onClick={() => handleSave(index)}>Save</button>
                        <li>{item.name} is {item.age} years old.
                            <button onClick={() => handleDelete(index)} style={{marginLeft: '10px'}}>Delete</button>
                            <button onClick={() => handleUpdate(item, index)} style={{marginLeft: '5px'}}>Edit</button>
                        </li>
                    </div>
                )
            })) : ''}
            <SearchItem />
        </div>
    )
}

export default ItemList
