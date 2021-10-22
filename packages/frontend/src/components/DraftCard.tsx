import { Button, Header, Item, Label, Segment } from "semantic-ui-react"

const DraftCard = () => {
    return <Item>
        <Item.Content>
            <Item.Header as='a'>Here is my proposal</Item.Header>
            <Item.Meta>
            <span className='cinema'>Posted 1 hour ago</span>
            </Item.Meta>
            <br />
            <Item.Description>Please take a look</Item.Description>
            <br />
            <Item.Extra>
                <Label>APPROVED</Label>
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