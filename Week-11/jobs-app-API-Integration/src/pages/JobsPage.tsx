import {useEffect, useState} from 'react'
import {get} from '../utils/ClientApi.ts';
import "./jobs.css"


type Job = {
    id: string;
    title: string;
    brief: string
    min_qualification: string;
    sector: string;
    no_of_vacancies: number;
    no_of_applicants: number;
    created_at: string;
    updated_at: string;
}

const JobsPage = () => {

    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch jobs from API and set state
        setLoading(true)
        get('/jobs').then((data) => {
            setJobs(data?.postings || []);
        }).catch((err) => {
            setError(err.message || 'Failed to fetch jobs');
        }).finally(() => {
            setLoading(false);
        })
    }, []);

  return (
    <div className="jobs-page container">
      <header className="jobs-header">
        <h1>Open Job Postings</h1>
      </header>

      {loading && <div className="muted">Loading…</div>}
      {error && <div className="error">{error}</div>}

      <div className="jobs-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job.id} >
            <div className="job-card-body">
              <div className="job-card-title">{job.title}</div>
              <p className="job-card-brief">{job.brief}</p>
              <div className="job-card-meta">
                <span>{job.sector}</span>
                <span>•</span>
                <span>{job.min_qualification}</span>
                <span>•</span>
                <span>{job.no_of_vacancies} vacancies</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default JobsPage