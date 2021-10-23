import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Header, Loader } from "semantic-ui-react";



const CreateDraftPage = (props: { taskId: number }) => {

    const [passphrase, setPassphrase] = useState("");
    const [loading, setLoading] = useState(false);
    
    let history = useHistory();

    const handleSubmit = () => {
        setLoading(true);
        const body = {
            userid: 4,
            taskid: props.taskId,
            passphrase: passphrase
        }
        fetch('http://localhost:3000/draft',{
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
            Post a new draft
        </Header>
        {loading ? 
            <Loader active>Submitting...</Loader> : 
            <Form>
                <Form.Field>
                    <label>Enter passphrase</label>
                    <input placeholder='Passphrase' onChange={(e) => setPassphrase(e.target.value)}/>
                </Form.Field>
            <Button type='submit' color='twitter' onClick={handleSubmit}>Submit</Button>
            </Form>
        }
    </div>
}

export default CreateDraftPage;