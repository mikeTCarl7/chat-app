import React from "react";
import ReactDom from "react-dom";


import Message from "./index";

import { Me, MessageData } from "../../shared/types";

const user: Me = { userName: "Mike", loginTime: 2131651651 };
const messageData: MessageData = { message: "sdfsdf", id: "4", name: "Mike" };
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Message currentUser={user} message={messageData} />, div);
  ReactDom.unmountComponentAtNode(div);
});
