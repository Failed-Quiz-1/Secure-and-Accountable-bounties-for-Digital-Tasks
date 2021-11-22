import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header, Loader } from "semantic-ui-react";
import { createDraft, uploadFile } from "../utils/api";
import { getUserId } from "../utils/util";
import { useForm } from "react-hook-form";

const CreateDraftPage = (props: any) => {
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  const taskId = parseInt(props.match.params.taskId);

  let history = useHistory();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const userid = getUserId();
    try {
      const formData = new FormData();
      formData.append("file", data.pdf[0]);
      const res = await uploadFile(formData);
      await createDraft(taskId, passphrase, res.filename, res.hash);
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field>
            <label>Enter passphrase</label>
            <input
              placeholder="Passphrase"
              onChange={(e) => setPassphrase(e.target.value)}
            />
            <input type="file" name="pdf" ref={register} />
          </Form.Field>
          <Button type="submit" color="twitter">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CreateDraftPage;
