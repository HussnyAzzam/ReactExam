import React, { Component } from "react";
import { Form, Dropdown, Button } from "react-bootstrap";
import validator, { field } from "./RegisterVaildator";
import "./styles.css";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      name: field({ name: "name", minLength: 2 }),
      cellular: field({
        name: "Cellular",
        pattern: /^\d{3}-\d{7}$/,
        patternMsg: "Cellular Phone must be like 123-4567890"
      }),
      reached: field({ name: "reached" })
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    console.log(name, value);

    this.setState({
      [name]: {
        ...this.state[name],
        value,
        ...validator(value, name, this.state[name].validations)
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("inside onsubmit----");
    const contactUs = Object.assign({}, this.state);

    for (let key in contactUs) {
      const { value, validations } = contactUs[key];

      const { valid, errors } = validator(value, key, validations);

      if (!valid) {
       
        contactUs[key].valid = valid;
        contactUs[key].errors = errors;
      }
    }

    this.setState({ ...contactUs });
  }

  render() {
    return (
      <>
        <Form className="formA" onSubmit={this.onSubmit}>
          <Form.Group controlId="forName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter You name"
              onBlur={this.onInputChange}
            />
            {this.state.name.errors.map((err, i) => (
              <Form.Text key={i} className="text-danger">
                {err}
              </Form.Text>
            ))}
          </Form.Group>

          <Form.Group controlId="forCellular">
            <Form.Label>Cellular Phone</Form.Label>
            <Form.Control
              type="text"
              name="cellular"
              placeholder="Enter You Cellular Phone"
              onBlur={this.onInputChange}
            />
            {this.state.cellular.errors.map((err, i) => (
              <Form.Text key={i} className="text-danger">
                {err}
              </Form.Text>
            ))}
          </Form.Group>

          <Form.Group controlId="forReached1">
            <Form.Label>Example select</Form.Label>
            <Form.Control
              as="select"
              variant="secondary"
              onBlur={this.onInputChange}
              name="reached"
            >
              <option value="">How did you reached us?</option>
              <option value="1">Advertisment</option>
              <option value="2">News</option>
              <option value="3">Friends</option>
              <option value="4">Social Media</option>
            </Form.Control>

            {this.state.reached.errors.map((err, i) => (
              <Form.Text key={i} className="text-danger">
                {err}
              </Form.Text>
            ))}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}
