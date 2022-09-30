import { Button, Card, Page, TextField } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./PolariseStyle.css";
function Polaris() {
  const navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleTextFieldChangeUsername = useCallback(
    (value) => setUsernameValue(value),
    []
  );

  const handleTextFieldChangePassword = useCallback(
    (value) => setPasswordValue(value),
    []
  );

  const handleClearButtonClickUsername = useCallback(
    () => setUsernameValue(""),
    []
  );

  const handleClearButtonClickPassword = () => {
    setPasswordValue("");
  };

  const Login = () => {
    const url = new URL("https://fbapi.sellernext.com/user/login");
    let data = { username: usernameValue, password: passwordValue };
    for (let i in data) {
      url.searchParams.append(i, data[i]);
    }
    let result = fetch(url, {
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
      },
    })
      .then((result) => result.json())
      .then((data) => data)
      .then((data) => {
        localStorage.setItem("myData", data.data.token);
        sessionStorage.setItem("myData", data.data.token);
        console.log(sessionStorage.getItem("myData"));
      });
    console.log(data);
    navigate("./dashboard");
  };

  return (
    <div className="mainContainer">
      <Page title="Login">
        <Card
          sectioned
          //   title="Variants"
          //  actions={[{ content: "Add variant" }]}
          id="cards"
        >
          <div>
            <TextField
              label="Username"
              value={usernameValue}
              onChange={handleTextFieldChangeUsername}
              clearButton
              onClearButtonClick={handleClearButtonClickUsername}
              autoComplete="off"
              id="UsernameTextfield"
            />
            <TextField
              label="Password"
              value={passwordValue}
              onChange={handleTextFieldChangePassword}
              clearButton
              onClearButtonClick={handleClearButtonClickPassword}
              autoComplete="off"
              id="PasswordTextfield"
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button primary onClick={Login}>
              Submit
            </Button>
          </div>
        </Card>
      </Page>
    </div>
  );
}

export default Polaris;
