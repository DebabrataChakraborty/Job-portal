import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostedJobs = () => {

    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:3000/job?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data))


    }, [user.email])
    return (
        <div>
            <h2 className="text-3xl">My Posted Jobs:{jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Title</th>
                            <th>Deadline</th>
                            <th>Count</th>
                            <th>View Application</th>
        
                        </tr>
                    </thead>
                    <tbody>{
                        jobs.map((job, index)=><tr key={job.id}>
                            <th>{index + 1}</th>
                            <td>{job.title}</td>
                            <td>{job.applicationDeadline}</td>
                            <td>{job.applicationCount}</td>
                            <td>
                               <Link to={`/viewApplications/${job._id}`}>
                                <button className='btn btn-primary'>view Application</button>
                               </Link>
                            </td>
                        </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;