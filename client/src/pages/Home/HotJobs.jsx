import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import HotJobsCard from './HotJobsCard';

const HotJobs = () => {
    const [jobs, setJobs] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/job')
        .then(res=> res.json())
        .then(data=> setJobs(data))

    },[])
    return (
        <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {
                    jobs.map(job =><HotJobsCard
                    key={job._id}
                    job={job}
                    ></HotJobsCard>)
                }
            </div>
        </div>
    );
};

export default HotJobs;