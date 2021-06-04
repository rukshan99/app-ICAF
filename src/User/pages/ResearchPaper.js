import React from 'react';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const ResearchPaper = () => {
  const docs = [
    { uri: "https://cdn.pixabay.com/photo/2018/05/08/18/46/pdf-3383632_1280.png"}
    //{ uri: require("../../Docs/conference-template.pdf") } // Local File     { uri: require("../../Docs/conference-template.docx") },
  ];

  //return <iframe src="https://cdn.pixabay.com/photo/2018/05/08/18/46/pdf-3383632_1280.png" sandbox="allow-scripts allow-same-origin"></iframe>
  return <DocViewer 
  pluginRenderers={DocViewerRenderers} 
  documents={docs} 
  theme={{
    primary: "#2a006e",
    secondary: "#ffffff",
    tertiary: "#5296d899",
    text_primary: "#ffffff",
    text_secondary: "#5296d8",
    text_tertiary: "#00000099",
    disableThemeScrollbar: false,
  }}
  sandbox="allow-scripts allow-same-origin Access-Control-Allow-Origin"
  />;
}

export default ResearchPaper;