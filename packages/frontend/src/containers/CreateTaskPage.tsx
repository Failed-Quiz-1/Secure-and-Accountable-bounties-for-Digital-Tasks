import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header, Loader } from "semantic-ui-react";

const CreateTaskPage = () => {

    const [description, setDescription] = useState("");
    const [taskName, setTaskName] = useState("");
    const [loading, setLoading] = useState(false);
    
    let history = useHistory();

    const handleSubmit = () => {
        setLoading(true);
        const body = {
            userid: 4,
            taskname: taskName,
            description: description
        }
        fetch('http://localhost:3000/task',{
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then((data) => {setLoading(false); history.goBack()});
    }

    return <div>
        <Header as='h2' block>
            Post a new task
        </Header>
        {loading ? 
            <Loader active>Submitting...</Loader> : 
            <Form>
                <Form.Field>
                    <label>Task Name</label>
                    <input placeholder='Task Name' onChange={(e) => setTaskName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <input placeholder='Description' onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
            <Button type='submit' color='twitter' onClick={handleSubmit}>Submit</Button>
            </Form>
        }
    </div>
}

export default CreateTaskPage;