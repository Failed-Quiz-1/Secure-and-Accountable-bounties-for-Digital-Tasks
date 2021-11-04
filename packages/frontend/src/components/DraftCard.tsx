import React from "react";
import { Button, Header, Item, Label, Segment } from "semantic-ui-react";
import Draft from "../models/draft";
import { SignatureMessage } from "crypto-helper";
import { getUserId } from "../utils/util";
interface DraftCardProps {
  draft: Draft;
}

const DraftCard = (props: DraftCardProps) => {
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
            <Button floated="right" basic color="green">
              Approve
            </Button>
            <Button floated="right" basic color="red">
              Decline
            </Button>
          </Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
};

export default DraftCard;
