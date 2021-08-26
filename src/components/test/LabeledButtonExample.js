import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import "./btnLabel.css";

const LabeledButtonExample = () => (
  <div>
    <Button as="div" className="btn-label on" labelPosition="right">
      <Button>
        <img src={`${process.env.PUBLIC_URL}/images/menu-info/heart.png`} />
        {/*<img src={`${process.env.PUBLIC_URL}/images/menu-info/no_heart.png`} />*/}
      </Button>
      <Label as="a" basic pointing="left">
        2,048
      </Label>
    </Button>
  </div>
);

export default LabeledButtonExample;
