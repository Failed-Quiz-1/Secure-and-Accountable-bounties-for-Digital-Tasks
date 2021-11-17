import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header, Loader } from "semantic-ui-react";
import { createTask } from "../utils/api";
import { getUserId } from "../utils/util";

const CreateTaskPage = (props: any) => {
  const jobId = props.match.params.jobId;

  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createTask(price, taskName, description, jobId);
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
        Post a new task
      </Header>
      {loading ? (
        <Loader active>Submitting...</Loader>
      ) : (
        <Form>
          <Form.Field>
            <label>Task Name</label>
            <input
              placeholder="Task Name"
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              placeholder="Price"
              onChange={(e) => {
                try {
                  setPrice(parseFloat(e.target.value));
                } catch (error) {}
              }}
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

export default CreateTaskPage;
