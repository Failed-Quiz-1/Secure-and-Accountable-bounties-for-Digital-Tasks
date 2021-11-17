import { Link } from "react-router-dom";
import { Button, Card, Icon } from "semantic-ui-react";
import Job from "../models/job";

interface JobCardProps {
  job: Job;
}

const JobCard = (props: JobCardProps) => {
  return (
    <div>
      <Card fluid>
        <Card.Content header={props.job.name} />
        <Card.Content description={props.job.description} />
        <div style={{ margin: "12px" }}>
          <Card.Meta>
            <span className="date">Posted 30min ago</span>
          </Card.Meta>
        </div>
        <Card.Content extra>
          <Icon name="money" />
          {`   USD ${props.job.price}`}
        </Card.Content>

        <Button animated>
          <Link to={`/jobs/${props.job.id}`}>
            <Button.Content visible>View Details</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Link>
        </Button>
      </Card>
    </div>
  );
};

export default JobCard;
