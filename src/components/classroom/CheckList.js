import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';


class CheckList extends Component {
    state = {
        show: false,
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button variant="outline-secondary rounded-pill"  onClick={this.handleShow}>
                    Check list
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Check list today</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


}

export default CheckList;