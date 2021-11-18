import React from "react";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import Draft from "../models/draft";
import { SignatureMessage } from "crypto-helper";
import { getUserId } from "../utils/util";
import MnemonicModal from "./MnemonicModal";
import {
  approveDraft,
  baseURL,
  rejectDraft,
  releaseDraftIP,
} from "../utils/api";
import Task from "../models/task";
interface DraftCardProps {
  draft: Draft;
  task: Task;
}

enum UserAction {
  approve,
  decline,
  releaseIP,
}

const DraftCard = (props: DraftCardProps) => {
  const [showMneMonicModal, setShowMneMonicModal] = React.useState(false);
  const [userAction, setUserAction] = React.useState<UserAction>(
    UserAction.approve
  );
  const draftSigMessage: SignatureMessage = JSON.parse(
    props.draft.draft_sig_message
  );
  const shouldNotShowButtons =
    props.draft.reject_signature !== "" ||
    draftSigMessage.toUserId !== getUserId() ||
    props.task.approval_draft_id !== 0;

  const isApprovedDraft = props.task.approval_draft_id === props.draft.id;
  const shouldShowReleaseIPButton =
    isApprovedDraft &&
    props.draft.author.id === getUserId() &&
    props.task.ip_signature === "";

  const itemOnClick = () => {
    const info = `
  Approve Signature Message: ${props.draft.draft_sig_message}
  Approve Signature: ${props.draft.draft_signature}
  Reject Signature Message: ${props.draft.reject_sig_message}
  Reject Signature: ${props.draft.reject_signature}
          `;
    alert(info);
  };

  return (
    <Item>
      <Item.Content>
        {isApprovedDraft ? (
          <div>
            <Label as="a" tag color="teal">
              Approved
            </Label>
            <br />
          </div>
        ) : (
          <div></div>
        )}
        <br />

        <Item.Header>{props.draft.author.name}</Item.Header>

        <br />
        <br />
        <a href={`${baseURL}/upload/${props.draft.filename}`}>
          Draft File Link
        </a>
        <br />
        <br />
        <Item.Meta>{props.draft.createdOn}</Item.Meta>
        <Button floated="right" onClick={itemOnClick}>
          Show Signature Info
        </Button>
        {shouldShowReleaseIPButton ? (
          <Item.Extra>
            <Button
              floated="right"
              basic
              color="green"
              onClick={() => {
                setUserAction(UserAction.releaseIP);
                setShowMneMonicModal(true);
              }}
            >
              Release IP
            </Button>
          </Item.Extra>
        ) : (
          <div></div>
        )}
        {shouldNotShowButtons ? (
          <div></div>
        ) : (
          <Item.Extra>
            <Button
              floated="right"
              basic
              color="green"
              onClick={() => {
                setUserAction(UserAction.approve);
                setShowMneMonicModal(true);
              }}
            >
              Approve
            </Button>
            <Button
              floated="right"
              basic
              color="red"
              onClick={() => {
                setUserAction(UserAction.decline);
                setShowMneMonicModal(true);
              }}
            >
              Decline
            </Button>
          </Item.Extra>
        )}
      </Item.Content>
      {showMneMonicModal ? (
        <MnemonicModal
          onSubmit={async (input: string) => {
            try {
              if (userAction === UserAction.decline) {
                await rejectDraft(props.draft.id, input);
              } else if (userAction === UserAction.approve) {
                await approveDraft(props.task.id, props.draft.id, input);
              } else if (userAction === UserAction.releaseIP) {
                await releaseDraftIP(props.task.id, props.draft.id, input);
              }
              window.location.reload();
            } catch (error) {
              alert(
                "Something is wrong with your mnemonics input, please try again"
              );
            }

            setShowMneMonicModal(false);
            console.log(input);
          }}
          onClose={() => {
            setShowMneMonicModal(false);
          }}
        />
      ) : (
        <div></div>
      )}
    </Item>
  );
};

export default DraftCard;
