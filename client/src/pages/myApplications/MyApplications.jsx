import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const MyApplications = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/job-application?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data:", data);
                setJobs(data);
            })
            .catch(err => console.error("Error fetching jobs:", err));
    }, [user?.email]);



    console.log(jobs.length)
    return (
        <div>
            <h2 className="text-3xl">My Applications:{jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Post Name & Location</th>
                            <th>Company Name</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job._id}>
                                <td>
                                    <input type="checkbox" className="checkbox" />
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img src={job.job_info?.company_logo || "/default-logo.png"} alt={job.job_info?.title} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{job.job_info?.title || "N/A"}</div>
                                            <div className="text-sm opacity-50">{job.job_info?.location || "Unknown"}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{job.job_info?.company || "N/A"}</td>
                                <td>{job.job_info?.status || "Pending"}</td>
                                
                            </tr>
                        ))}
                    </tbody>




                </table>
            </div>
        </div>
    );
};

export default MyApplications;