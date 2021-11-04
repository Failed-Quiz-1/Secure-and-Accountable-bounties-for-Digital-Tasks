import React from "react";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import Draft from "../models/draft";
import { SignatureMessage } from "crypto-helper";
import { getUserId } from "../utils/util";
import MnemonicModal from "./MnemonicModal";
import { rejectDraft } from "../utils/api";
interface DraftCardProps {
  draft: Draft;
}

enum UserAction {
  approve,
  decline,
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
    draftSigMessage.toUserId !== getUserId();

  return (
    <Item>
      <Item.Content>
        {/* <Item.Header as='a'>{props.draft.id}</Item.Header> */}
        <Item.Description>Draft id: {props.draft.id}</Item.Description>
        <Item.Description>
          Draft Message: {props.draft.draft_sig_message}
        </Item.Description>
        <Item.Description>
          Draft Signature: {props.draft.draft_signature}
        </Item.Description>
        <Item.Description>
          Reject Signature: {props.draft.reject_signature}
        </Item.Description>
        <Item.Description>
          Reject Message: {props.draft.reject_sig_message}
        </Item.Description>

        <br />
        <Item.Meta>
          <span className="cinema">{props.draft.createdOn}</span>
        </Item.Meta>
        <br />
        {shouldNotShowButtons ? (
          <div></div>
        ) : (
          <Item.Extra>
            <Label>{props.draft.author.name}</Label>
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
            if (userAction === UserAction.decline) {
              try {
                await rejectDraft(props.draft.id, input);
                window.location.reload();
              } catch (error) {
                alert(
                  "Something is wrong with your mnemonics input, please try again"
                );
              }
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
