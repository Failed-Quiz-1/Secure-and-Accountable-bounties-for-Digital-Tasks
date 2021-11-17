import { Step } from "semantic-ui-react";
import Task from "../models/task";

const TaskProgress = (props: { task: Task }) => {
  const itemOnClick = () => {
    const info = `
Payment Message: ${props.task.payment_sig_message}
Payment Signature: ${props.task.payment_signature}
IP Release Message: ${props.task.ip_sig_message}
IP Release  Signature: ${props.task.ip_signature}
Server Release Message: ${props.task.server_sig_message}
Server Release Signature: ${props.task.server_signature}
        `;
    alert(info);
  };

  return (
    <div
      style={{ marginTop: "20px", marginBottom: "20px" }}
      onClick={itemOnClick}
    >
      <p>(Click on this component below to show the signature details)</p>
      <Step.Group widths={5} ordered>
        <Step completed={props.task.step >= 0} active={!(props.task.step >= 0)}>
          <Step.Content>
            <Step.Title>Posted</Step.Title>
            <Step.Description>Draft submitted successfully</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={props.task.step >= 1} active={!(props.task.step >= 1)}>
          <Step.Content>
            <Step.Title>Approved</Step.Title>
            <Step.Description>Payment submitted to Fiver</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={props.task.step >= 2} active={!(props.task.step >= 2)}>
          <Step.Content>
            <Step.Title>Completed</Step.Title>
            <Step.Description>IP released to Fiver</Step.Description>
          </Step.Content>
        </Step>

        <Step completed={props.task.step >= 3} active={!(props.task.step >= 3)}>
          <Step.Content>
            <Step.Title>Release IP & Payment</Step.Title>
            <Step.Description>Fiver released IP and payment</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </div>
  );
};

export default TaskProgress;
