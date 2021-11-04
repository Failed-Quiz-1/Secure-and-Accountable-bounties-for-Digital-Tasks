import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Segment, Item, Loader } from "semantic-ui-react";
import Draft from "../models/draft";
import Task from "../models/task";
import { fetchDraftList } from "../utils/api";
import DraftCard from "./DraftCard";

interface DraftListProps {
  task: Task;
}

const DraftList = (props: DraftListProps) => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrafts(props.task.id);
  }, []);

  const fetchDrafts = async (taskId: number) => {
    setLoading(true);
    setDrafts([]);
    var data = await fetchDraftList(taskId);
    if (props.task.approval_draft_id === 0) {
      setDrafts(data);
      setLoading(false);
      return;
    }
    var approvedDraft = data.filter(
      (d) => d.id === props.task.approval_draft_id
    );
    var filteredData = data.filter(
      (d) => d.id !== props.task.approval_draft_id
    );
    var finalData: Draft[] = [...approvedDraft, ...filteredData];
    setDrafts(finalData);
    setLoading(false);
  };

  return (
    <div>
      <Header as="h2" block>
        Submitted Drafts
        <Link to={`/createdraft/${props.task.id}`}>
          <Button color="teal" floated="right">
            Submit Draft
          </Button>
        </Link>
      </Header>
      {loading ? (
        <Loader active>Loading</Loader>
      ) : (
        <Segment attached>
          <Item.Group divided>
            {drafts.length === 0 ? (
              <p>No drafts have been submitted yet</p>
            ) : (
              drafts.map((e: Draft) => (
                <DraftCard task={props.task} draft={e} />
              ))
            )}
          </Item.Group>
        </Segment>
      )}
    </div>
  );
};

export default DraftList;
