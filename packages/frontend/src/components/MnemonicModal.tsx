import React from "react";
import { Modal, Form, Header, Button } from "semantic-ui-react";
import "../css/MnemonicModal.css";

interface MnemonicModalProps {
  onSubmit: (mnemonic: string) => void;
  onClose: () => void;
}

const MnemonicModal = (props: MnemonicModalProps) => {
  const [input, setInput] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  return (
    <div>
      <Modal
        className={`modal-main`}
        as={Form}
        onSubmit={(e: any) => handleSubmit(e)}
        open={true}
        size="tiny"
      >
        <Header content="Fill in your secret mnemonics phrase here" as="h2" />
        <Modal.Content>
          <Form.Input
            label="Mnemonic Phrase"
            required
            type="text"
            placeholder="Fill in your secret here"
            onChange={(e) => setInput(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type="submit"
            color="red"
            content="Close"
            onClick={props.onClose}
          />
          <Button type="submit" color="green" content="Submit" />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MnemonicModal;
