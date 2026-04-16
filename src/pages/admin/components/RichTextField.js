import React from "react";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link"],
    [{ align: [] }],
    ["clean"],
  ],
};

function RichTextField({ value, onChange, placeholder, disabled }) {
  return (
    <div className="admin-richtext">
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        readOnly={disabled}
        bounds=".admin-richtext"
      />
    </div>
  );
}

export default RichTextField;
