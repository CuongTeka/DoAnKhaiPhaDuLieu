import React from "react";
// import "./json.css";

const JSONRenderer = ({ json, indent = 2, level = 0 }) => {
  const parseJSON = (obj, depth = 0) => {
    const spacing = " ".repeat(depth * indent);

    if (typeof obj === "string") return <span className="string">"{obj}"</span>;
    if (typeof obj === "number") return <span className="number">{obj}</span>;
    if (typeof obj === "boolean")
      return <span className="boolean">{obj.toString()}</span>;
    if (obj === null) return <span className="null">null</span>;

    if (Array.isArray(obj)) {
      return (
        <span>
          {"[\n"}
          {obj.map((item, i) => (
            <React.Fragment key={i}>
              {spacing}
              {parseJSON(item, depth + 1)}
              {i < obj.length - 1 ? ",\n" : "\n"}
            </React.Fragment>
          ))}
          {spacing}
          {"]"}
        </span>
      );
    }

    if (typeof obj === "object") {
      return (
        <span>
          {"{\n"}
          {Object.entries(obj).map(([key, value], i) => (
            <React.Fragment key={key}>
              {spacing}
              <span className="key">"{key}"</span>:{" "}
              {parseJSON(value, depth + 1)}
              {i < Object.keys(obj).length - 1 ? ",\n" : "\n"}
            </React.Fragment>
          ))}
          {spacing}
          {"}"}
        </span>
      );
    }

    return obj; // Fallback
  };

  return <pre className="api-docs-json">{parseJSON(json, level)}</pre>;
};

export default JSONRenderer;
