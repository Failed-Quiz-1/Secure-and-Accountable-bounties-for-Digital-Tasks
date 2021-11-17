import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header, Loader } from "semantic-ui-react";
import { createJob, createTask } from "../utils/api";
import { getUserId } from "../utils/util";

const CreateJobPage = () => {
  const [description, setDescription] = useState("");
  const [jobName, setJobName] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createJob(getUserId(), jobName, description);
      setLoading(false);
      history.goBack();
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div>
      <Header as="h2" block>
        Post a new job
      </Header>
      {loading ? (
        <Loader active>Submitting...</Loader>
      ) : (
        <Form>
          <Form.Field>
            <label>Job Name</label>
            <input
              placeholder="Task Name"
              onChange={(e) => setJobName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" color="twitter" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CreateJobPage;
