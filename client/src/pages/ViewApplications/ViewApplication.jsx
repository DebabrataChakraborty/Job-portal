import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplication = () => {
    const applications = useLoaderData();

    const handleStatusUpdate= (e,id)=>{
        console.log(e.target.value,id)
        const data = {
            status:e.target.value
        }
        fetch(`http://localhost:3000/job-application/${id}`,{
            method : 'PATCH',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
                 if (data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Status has been Updated!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                   
                }
        })
    }
    
    return (
        <div>
            <h2 className="text-3xl">Application for this job:{applications.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, index) =>
                                <tr key={application._id}>
                                    <th>{index + 1}</th>
                                    <td>{application.applicant_email}</td>
                                    <td>Quality Control Specialist</td>
                                    <td>
                                        <select
                                        onChange={(e)=>handleStatusUpdate(e,application._id)} defaultValue={application.status || 'Change Status'}className="select select-md">
                                            <option disabled={true}>Change Status</option>
                                            <option>Under Review</option>
                                            <option>Set interview</option>
                                            <option>Rejected</option>
                                            <option>Hired</option>
                                        </select>
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

export default ViewApplication;