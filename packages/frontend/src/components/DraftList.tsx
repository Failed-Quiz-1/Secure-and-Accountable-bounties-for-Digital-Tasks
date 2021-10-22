import { useEffect, useState } from "react";
import { Button, Header, Segment, Item, Loader } from "semantic-ui-react"
import Draft from "../models/draft";
import DraftCard from "./DraftCard"

interface DraftListProps {
    taskId: number
}

const DraftList = (props: DraftListProps) => {

    const [drafts, setDrafts] = useState<Draft[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDrafts(props.taskId);
    }, [])

    const fetchDrafts = (taskId: number) => {
        setLoading(true)
        setDrafts([]);
        fetch('http://localhost:3000/draft/task/' + taskId.toString())
            .then(response => response.json())
            .then((data: Draft[]) => {console.log(data); setDrafts(data); setLoading(false)});
    }

    
    return  <div>
        <Header as='h2' block>
            Submitted Drafts
        </Header>
        {loading ? 
            <Loader active>Loading</Loader> :
            <Segment attached>
                <Item.Group divided>
                    {
                        drafts.length === 0 ? <p>No drafts have been submitted yet</p> : 
                        drafts.map((e: Draft) => <DraftCard draft={e}/>)
                    }
                </Item.Group>
            </Segment>
        }
    </div>       
}

export default DraftList