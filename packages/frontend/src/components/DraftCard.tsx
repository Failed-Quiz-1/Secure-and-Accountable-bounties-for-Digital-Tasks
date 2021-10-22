import { Button, Header, Item, Label, Segment } from "semantic-ui-react"
import Draft from "../models/draft";

interface DraftCardProps {
    draft: Draft
}

const DraftCard = (props:DraftCardProps ) => {
    return <Item>
        <Item.Content>
            {/* <Item.Header as='a'>{props.draft.id}</Item.Header> */}
            <Item.Description>Draft Signature: {props.draft.draft_signature}</Item.Description>
            <Item.Description>Reject Signature: {props.draft.reject_signature}</Item.Description>
            <br />
            <Item.Meta>
            <span className='cinema'>{props.draft.createdOn}</span>
            </Item.Meta>
            <br />
            <Item.Extra>
                <Label>{props.draft.author.name}</Label>
                <Button floated='right' basic color='green'>
                    Approve
                </Button>
                <Button floated='right' basic color='red'>
                    Decline
                </Button>
            </Item.Extra>
        </Item.Content>
    </Item>
}

export default DraftCard;