import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
    url: string,
  fileName: string

};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const ImageUpload = ({ url, fileName }: Props) => {
  const [files, setFiles] = useState<any | []>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => setFiles(acceptedFiles[0]),
  });

  const thumbs = files.map((file: string) => (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
      }}
      key={fileName}
    >
      <div style={thumbInner}>
        <img
          src={url}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(url);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: string) => URL.revokeObjectURL(file));
  }, []);

  return (
    <section className="container border">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        {thumbs}
      </aside>
    </section>
  );
}

export default ImageUpload;
