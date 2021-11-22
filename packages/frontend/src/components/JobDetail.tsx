import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Icon,
  Loader,
  Segment,
} from "semantic-ui-react";
import Job from "../models/job";
import { fetchJobDetail } from "../utils/api";
import { getUserId } from "../utils/util";

const JobDetail = (props: { jobId: number }) => {
  const [job, setJob] = React.useState<Job | undefined>(undefined);

  React.useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    setJob(undefined);
    const job = await fetchJobDetail(props.jobId);
    setJob(job);
  };

  if (!job) {
    return <Segment attached>Loading...</Segment>;
  }
  return (
    <Segment attached>
      <h1>{job.name}</h1>
      <body>{job.description}</body>
      <Divider />
      <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
        <Icon name="money" />
        {`   USD ${job.price}`}
      </div>
      <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
        <Icon name="user" />
        {`   Poster: ${job.poster.name}`}
      </div>
      <Divider />
      {getUserId() === job.poster.id && (
        <Link to={`/createtask/${props.jobId}`}>
          <Button floated="right" color="teal">
            Create Task
          </Button>
          <br />
          <br />
        </Link>
      )}
    </Segment>
  );
};

export default JobDetail;
