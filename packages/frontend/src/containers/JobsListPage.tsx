import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Grid, Loader } from "semantic-ui-react";
import JobCard from "../components/JobCard";
import Job from "../models/job";
import { fetchJobList } from "../utils/api";
import { chunk } from "../utils/util";

const JobsListPage = () => {
  const [jobChunks, setJobChunks] = useState<Job[][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setJobChunks([]);
    var data = await fetchJobList();
    setJobChunks(chunk(data, 3));
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Header as="h2" block>
          Available Jobs
          <Link to="/createjob">
            <Button floated="right" color="teal">
              Create Job
            </Button>
          </Link>
        </Header>
      </div>
      {loading ? (
        <Loader active>Loading</Loader>
      ) : (
        <Grid columns={3}>
          {jobChunks.map((chunk: Job[]) => {
            return (
              <Grid.Row>
                {chunk.map((job: Job) => {
                  return (
                    <Grid.Column>
                      <JobCard job={job} />
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default JobsListPage;
