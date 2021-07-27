import React, { useContext } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import UserNameFilterContext from '../contexts/UserNameFilterContext';

export default function UserNameFilter() {
  const { userName, handleUserNameChange } = useContext(UserNameFilterContext);

  return (
    <div className="user-name-filter">
      <Form.Group as={Row} className="mb-3">
        <Form.Label column lg={3} md={4} sm={5} className="text-end fw-bold" htmlFor="user-name">
          Filter Users by Name:
        </Form.Label>
        <Col lg={9} md={8} sm={7}>
          <Form.Control
            id="user-name"
            name="user-name"
            type="text"
            placeholder="name"
            value={userName}
            onChange={handleUserNameChange}
          />
        </Col>
      </Form.Group>
    </div>
  );
}
