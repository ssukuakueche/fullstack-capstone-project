import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {urlConfig} from '../../config';
import axios from 'axios';


function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();


    async function fetchGifts ()
    {
        try {
            const response =  await axios.get(`${urlConfig.backendUrl}/api/gifts`);
            setGifts(response.data);
        }
        catch(e)
        {
            console.log(`HTTP Error: ${e}`);
        }
    }
    useEffect(() => {
        // Task 1: Write async fetch operation
        fetchGifts();
    }, []);

    // Task 2: Navigate to details page
    const goToDetailsPage = (productId) => {
        navigate(`/app/products/${productId}`)
    };

    // Task 3: Format timestamp
    const formatDate = (timestamp) => {
       const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
      };

    const getConditionClass = (condition) => {
        return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id} className="col-md-4 mb-4">
                        <div className="card product-card">

                            {/* // Task 4: Display gift image or placeholder */}
                            <img src={gift.image} className='card-image' alt={gift.name}/>

                            <div className="card-body">

                                {/* // Task 5: Display gift image or placeholder */}
                                <p className='card-title'>{gift.name}</p>

                                <p className={`card-text list-group ${getConditionClass(gift.condition)}`}>
                                {gift.condition}
                                </p>

                                {/* // Task 6: Display gift image or placeholder */}
                                <p className='card-date'>{formatDate(gift.date_added)}</p>
                                

                                <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
