import { Button, Header, Segment, Item } from "semantic-ui-react"
import DraftCard from "./DraftCard"

interface DraftListProps {
    taskId: string
}

const DraftList = (props: DraftListProps) => {
    return  <div>
        <Header as='h2' block>
            Submitted Drafts
        </Header>
        <Segment attached>
            <Item.Group divided>
                <DraftCard />
                <DraftCard />
                <DraftCard />
            </Item.Group>'
        </Segment>
    </div>       
}

export default DraftList