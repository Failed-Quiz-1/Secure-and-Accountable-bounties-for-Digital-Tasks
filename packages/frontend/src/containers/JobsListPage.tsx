import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Grid } from "semantic-ui-react";
import JobCard from "../components/JobCard";
import Job from "../models/job";
import { chunk } from "../utils/util";

const JobsListPage = () => {
  const jobs: Job[] = require("../mocks/jobs.json");
  const jobChunks: Job[][] = chunk(jobs, 3);

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
    </div>
  );
};

export default JobsListPage;
