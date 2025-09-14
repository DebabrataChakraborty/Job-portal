import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'

const JobApply = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate()
    console.log(id, user)


    const submitJobApplication = e => {
        e.preventDefault();
        const form = e.target;
        const linkedIn = form.linkedIn.value;
        const github = form.github.value;
        const resume = form.resume.value;
        console.log(linkedIn, github, resume);

        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            linkedIn,
            github,
            resume

        }
        fetch('http://localhost:3000/job-applications', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Apply Done!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/myApplications')
                }
            })
    }

    return (
        <div className="card bg-base-200 w-full shadow-2xl p-6">
            <h1 className="text-4xl font-bold text-center mb-6">
                Apply for the Job and Good Luck!
            </h1>

            <form onSubmit={submitJobApplication} className="card-body">
                <div className="form-control space-y-4">
                    {/* LinkedIn */}
                    <label className="label">
                        <span className="label-text">LinkedIn URL</span>
                    </label>
                    <input
                        type="url"
                        name="linkedIn"
                        className="input input-bordered w-full"
                        placeholder="Enter your LinkedIn URL"
                        required
                    />

                    {/* GitHub */}
                    <label className="label">
                        <span className="label-text">GitHub URL</span>
                    </label>
                    <input
                        type="url"
                        name="github"
                        className="input input-bordered w-full"
                        placeholder="Enter your GitHub URL"
                        required
                    />

                    {/* Resume */}
                    <label className="label">
                        <span className="label-text">Resume URL</span>
                    </label>
                    <input
                        type="url"
                        name="resume"
                        className="input input-bordered w-full"
                        placeholder="Enter your Resume URL"
                        required
                    />

                    {/* Submit Button */}
                    <button className="btn btn-neutral mt-4 w-full">Apply</button>
                </div>
            </form>
        </div>


    );
};

export default JobApply;