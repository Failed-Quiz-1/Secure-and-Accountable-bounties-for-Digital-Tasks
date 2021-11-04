import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header, Loader } from "semantic-ui-react";
import { createDraft } from "../utils/api";
import { getUserId } from "../utils/util";

const CreateDraftPage = (props: any) => {
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);

  const taskId = parseInt(props.match.params.taskId);

  let history = useHistory();

  const handleSubmit = async () => {
    setLoading(true);
    const userid = getUserId();
    try {
      var data = await createDraft(taskId, passphrase);
      console.log(data);
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
        Post a new draft
      </Header>
      {loading ? (
        <Loader active>Submitting...</Loader>
      ) : (
        <Form>
          <Form.Field>
            <label>Enter passphrase</label>
            <input
              placeholder="Passphrase"
              onChange={(e) => setPassphrase(e.target.value)}
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

export default CreateDraftPage;
