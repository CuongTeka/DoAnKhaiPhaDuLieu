import React from "react";
import { Typography, Card, Collapse, Tag, Alert } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
// import "../universal.css";
import "./apipage.css";
import JSONRenderer from "../../utilities/JSONRenderer";
import JsonView from "@uiw/react-json-view";
import { darkTheme } from "@uiw/react-json-view/dark";
import { nordTheme } from "@uiw/react-json-view/nord";
import { githubDarkTheme } from "@uiw/react-json-view/githubDark";
import { vscodeTheme } from "@uiw/react-json-view/vscode";
import { gruvboxTheme } from "@uiw/react-json-view/gruvbox";
import { monokaiTheme } from "@uiw/react-json-view/monokai";
import { basicTheme } from "@uiw/react-json-view/basic";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const customTheme = {
  "--w-rjv-font-family": "monospace",
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "#268bd2",
  "--w-rjv-key-string": "#9cdcfe",
  "--w-rjv-background-color": "#1e1e1e",
  "--w-rjv-line-color": "#36334280",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "#9c9c9c7a",
  "--w-rjv-update-color": "#9cdcfe",
  "--w-rjv-copied-color": "#9cdcfe",
  "--w-rjv-copied-success-color": "#28a745",

  "--w-rjv-curlybraces-color": "#d4d4d4",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#d4d4d4",
  "--w-rjv-ellipsis-color": "#cb4b16",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",

  "--w-rjv-type-string-color": "#ce9178",
  "--w-rjv-type-int-color": "#b5cea8",
  "--w-rjv-type-float-color": "#b5cea8",
  "--w-rjv-type-bigint-color": "#b5cea8",
  "--w-rjv-type-boolean-color": "#569cd6",
  "--w-rjv-type-date-color": "#b5cea8",
  "--w-rjv-type-url-color": "#3b89cf",
  "--w-rjv-type-null-color": "#569cd6",
  "--w-rjv-type-nan-color": "#859900",
  "--w-rjv-type-undefined-color": "#569cd6",
};

const endpoints = [
  {
    method: "GET",
    path: "/users",
    description: "Retrieve a list of users.",
    parameters: [
      { name: "limit", description: "Number of users to return (optional)." },
    ],
    responses: [
      { code: 200, description: "Successfully retrieved the user data." },
      { code: 500, description: "Internal server error." },
    ],
  },
  {
    method: "POST",
    path: "/users",
    description: "Create a new user.",
    parameters: [
      { name: "name", description: "The name of the user." },
      { name: "email", description: "The email of the user." },
    ],
    responses: [
      { code: 201, description: "User created successfully." },
      { code: 400, description: "Invalid input data." },
    ],
  },
  {
    method: "PUT",
    path: "/users/{id}",
    description: "Update an existing user.",
    parameters: [
      { name: "id", description: "The unique identifier of the user." },
      { name: "name", description: "The updated name of the user." },
    ],
    responses: [
      { code: 200, description: "User updated successfully." },
      { code: 404, description: "User not found." },
    ],
  },
  {
    method: "DELETE",
    path: "/users/{id}",
    description: "Delete a user.",
    parameters: [
      { name: "id", description: "The unique identifier of the user." },
    ],
    responses: [
      { code: 204, description: "User deleted successfully." },
      { code: 404, description: "User not found." },
    ],
  },
];

const apiSections = [
  {
    title: "User Schema",
    endpoints: [
      {
        method: "GET",
        path: "/users",
        description: "Retrieve a list of users.",
        parameters: [
          {
            name: "limit",
            description: "Number of users to return (optional).",
          },
        ],
        responses: [
          {
            code: 200,
            description: "Successfully retrieved the user data.",
            example: {
              users: [
                { id: 1, name: "John Doe", email: "john@example.com" },
                { id: 2, name: "Jane Doe", email: "jane@example.com" },
              ],
            },
          },
          { code: 500, description: "Internal server error." },
        ],
      },
      {
        method: "POST",
        path: "/users",
        description: "Create a new user.",
        parameters: [
          { name: "name", description: "The name of the user." },
          { name: "email", description: "The email of the user." },
        ],
        responses: [
          {
            code: 201,
            description: "User created successfully.",
            example: {
              id: 3,
              name: "Alice",
              email: "alice@example.com",
            },
          },
          { code: 400, description: "Invalid input data." },
        ],
      },
    ],
  },
  {
    title: "Image Schema",
    endpoints: [
      {
        method: "POST",
        path: "/images",
        description: "Upload an image.",
        parameters: [
          { name: "file", description: "The image file to upload." },
        ],
        responses: [
          {
            code: 201,
            description: "Image uploaded successfully.",
            example: {
              id: 1,
              url: "https://example.com/images/1",
            },
          },
          { code: 400, description: "Invalid file format." },
        ],
      },
      {
        method: "DELETE",
        path: "/images/{id}",
        description: "Delete an image.",
        parameters: [
          { name: "id", description: "The unique identifier of the image." },
        ],
        responses: [
          { code: 204, description: "Image deleted successfully." },
          { code: 404, description: "Image not found." },
        ],
      },
    ],
  },
];

const CollapseColors = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

const methodColors = {
  GET: "blue",
  POST: "green",
  PUT: "warning",
  DELETE: "red",
};

const CustomIcon = ({ isActive }) =>
  isActive ? <UpOutlined /> : <DownOutlined />;

const ApiPage = () => {
  return (
    <div className="container">
      <Title level={2}>API Endpoints</Title>

      {apiSections.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          title={section.title}
          className="api-docs-card"
        >
          {section.endpoints.map((endpoint, index) => (
            <Collapse
              key={index}
              className={"api-docs-collapse " + CollapseColors[endpoint.method]}
            >
              <Panel
                header={
                  <span>
                    <Tag color={methodColors[endpoint.method]}>
                      {endpoint.method}
                    </Tag>
                    <Text strong>{endpoint.path}</Text>
                  </span>
                }
                key={index}
              >
                <Paragraph>{endpoint.description}</Paragraph>

                <Title level={4}>Parameters</Title>
                <table className="api-docs-table">
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, i) => (
                      <tr key={i}>
                        <td>
                          <Text code>{param.name}</Text>
                        </td>
                        <td>{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Title level={4}>Responses</Title>
                <table className="api-docs-table">
                  <thead>
                    <tr>
                      <th style={{ width: "17%" }}>Code</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.responses.map((response, i) => (
                      <tr key={i}>
                        <td>
                          <Tag color={response.code >= 400 ? "red" : "green"}>
                            {response.code}
                          </Tag>
                        </td>
                        <td>
                          {response.description}
                          <p>Response example value</p>
                          {response.example && (
                            // <JSONRenderer json={response.example} />
                            <JsonView
                              value={response.example}
                              style={vscodeTheme}
                              className="api-docs-json"
                              enableClipboard={false}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Panel>
            </Collapse>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default ApiPage;
