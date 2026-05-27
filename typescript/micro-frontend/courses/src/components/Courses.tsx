import React from 'react'
import './courses.css'
const Courses = () => {
    return (
        <div className='container'>
            <div className='cart'>
                <div>
                    <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*iYpC9Cn7XNeVNpT_aFSsVQ.png" alt="Courses" />
                </div>
                <h3>Explore a wide range of courses on Micro Frontend</h3>
                <p>Duration : 2 Hours</p>
            </div>
            <div className='cart'>
                <div>
                    <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*iYpC9Cn7XNeVNpT_aFSsVQ.png" alt="Courses" />
                </div>
                <h3>Micro Frontend In ReactJS</h3>
                <p>Duration : 1 Hours</p>
            </div>
        </div>
    )
}

export default Courses