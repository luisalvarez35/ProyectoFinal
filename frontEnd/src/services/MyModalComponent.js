import React, { Component } from "react";

import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyModalComponent extends Component {

    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={() => this.props.onHide()}>

                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.props.title}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.body}

                    </Modal.Body>

                    <Modal.Footer>
                        {this.props.footer}
                    </Modal.Footer>

                </Modal>
            </div>
        )
    };
}

export default MyModalComponent;