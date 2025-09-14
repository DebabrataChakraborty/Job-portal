import { LuMapPin } from "react-icons/lu";
import { CiDollar } from "react-icons/ci";
import { Link } from "react-router-dom";

const HotJobsCard = ({ job }) => {
    const { _id,title, company, company_logo, requirements, description, location, salaryRange } = job;
    return (
        <div className="card bg-base-100 shadow-sm border-b-4 border-blue-500
">
            <div className="flex gap-2">
                <figure>
                    <img className="w-18"
                        src={company_logo}
                        alt="Shoes" />
                </figure>
                <div>
                    <h4 className="tet-2l text-teal-600">{company}</h4>
                    <p className="text-red-950 flex gap-1 items-center"><LuMapPin ></LuMapPin >{location}</p>
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p className="text-gray-600">{description}</p>
                <div className="flex gap-1 flex-wrap">
                    {
                        requirements.map(skill =><p
                        className="border rounded-md text-center px-2 hover:text-blue-600 hover:bg-gray-400"
                        >{skill}</p>)
                    }
                </div>
                <div className="card-actions justify-end items-center mt-4">
                    <p className="text-green-700 flex items-center">Salary:<CiDollar /> {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                  <Link to={`/jobs/${_id}`}>
                    <button className="btn btn-primary">Apply</button>
                  </Link>
                </div>
            </div>
        </div>
    );
};

export default HotJobsCard;