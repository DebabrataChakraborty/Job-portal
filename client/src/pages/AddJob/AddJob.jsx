import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth';

const AddJob = () => {

    const {user} = useAuth();

    const handleAddJob = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const initialData = Object.fromEntries(formData.entries());
        console.log(initialData)
        const { min, max, currency, ...newJob } = initialData;
        newJob.salaryRange = { min, max, currency }
        newJob.requirements = newJob.requirements.split('\n')
        console.log(newJob)

        fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Job has been added.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    Navigate('/myPostedJobs')
                }
            })

    }
    return (
        <div>
            <h2 className="text-3xl">Post A New Job</h2>

            <form onSubmit={handleAddJob} className="card-body">
                <fieldset className="fieldset">
                    {/* Job Title */}
                    <label className="label">Job Title</label>
                    <input type="text" className="input" name="title" placeholder="Job Title" required />
                    {/* Location */}
                    <label className="label">Location</label>
                    <input type="text" name="location" className="input" placeholder="Location" required />
                    {/* Job Type */}
                    <label className="label">Job Type</label>
                    <select defaultValue="Pick a text editor" className="select select-primary">
                        <option disabled={true}>Pick a Job type</option>
                        <option>Full-Time</option>
                        <option>Intern</option>
                        <option>Part-Time</option>
                        <option>Remote</option>
                    </select>
                    {/* Category */}
                    <label className="label">Category</label>
                    <select defaultValue="Pick a text editor" className="select select-primary">
                        <option disabled={true}>Pick a category</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Teaching</option>
                    </select>
                    {/* salary range */}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                        <div className="lg:col-span-3">
                            <p className="">Salary Range</p>
                        </div>

                        {/* Min */}
                        <div className="flex flex-col">
                            <label className="label">Min</label>
                            <input
                                type="text"
                                name="min"
                                className="input input-bordered"
                                placeholder="Min"
                                required
                            />
                        </div>

                        {/* Max */}
                        <div className="flex flex-col">
                            <label className="label">Max</label>
                            <input
                                type="text"
                                name="max"
                                className="input input-bordered"
                                placeholder="Max"
                                required
                            />
                        </div>

                        {/* Currency */}
                        <div className="flex flex-col">
                            <label className="label">Currency</label>
                            <select name='currency' defaultValue="" className="select select-primary">
                                <option disabled value="">
                                    Currency
                                </option>
                                <option>BDT</option>
                                <option>USD</option>
                                <option>INR</option>
                                <option>AUD</option>
                            </select>
                        </div>
                    </div>
                    {/* Job Description */}
                    <label className="label">Job Description</label>
                    <textarea type="text" placeholder="Job Description" name="description" className="textarea textarea-primary w-full" required />

                    {/* Company */}
                    <label className="label">Company</label>
                    <input type="text" name="company" className="input" placeholder="company" required />

                    {/* Job Requirements */}
                    <label className="label">Job Requirements</label>
                    <textarea type="text" placeholder="Put each Requirements in a new line " name="requirements" className="textarea textarea-primary w-full" required />

                    {/* Job Responsibilities*/}
                    <label className="label">Job Responsibilities</label>
                    <textarea type="text" placeholder="write each Responsibilities in a new line " name="requirements" className="w-full textarea textarea-primary" required />

                    {/* Job status */}
                    <label className="label">Status</label>
                    <input type="text" className="input" name="status" placeholder="Job Status" required />

                    {/* Hr Email */}
                    <label className="label">HR Email</label>
                    <input type="email" defaultValue={user?.email} className="input" name="hr_email" placeholder="HR Email" required />


                    {/* Hr Name */}
                    <label className="label">HR Name</label>
                    <input type="text" className="input" name="hr_name" placeholder="HR Name" required />

                    {/* company logo */}
                    <label className="label">Company Logo</label>
                    <input type="text" className="input input-bordered" name="Company_logo" placeholder="Company Logo URL" required />

                    {/* applicationDeadline */}
                     <label className="label">Application Deadline</label>
                    <input type="date" className="input input-bordered" name="applicationDeadline" placeholder="Application Deadline" required />



                    <button className="btn btn-neutral mt-4">SUBMIT</button>
                </fieldset>
            </form>
        </div>
    );
};

export default AddJob;