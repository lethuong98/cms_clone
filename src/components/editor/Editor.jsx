import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";

export const ReactQuillEditor = ({ value, onChange }) => {
  return (
    <div className="text-editor">
      <EditorToolbar />
      <Box sx={{ backgroundColor: "#f4f6f8"}}>
        <ReactQuill 
        className="react-quill-editor"         
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
        />
      </Box>
    </div>
  );
};

export default ReactQuillEditor;
