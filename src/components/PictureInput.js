import React from "react";

const PictureInput = ({ self, maxSizeMb }) => {
  const message = `File must be less than ${maxSizeMb}MB.`;
  const maxSizeBytes = maxSizeMb * 1000000;

  return (
    <div style={{ display: "inline" }}>
      <input
        type="file"
        id="picture"
        name="picture"
        accept="image/*"
        onChange={e => {
          if (e.target.files[0] && e.target.files[0].size > maxSizeBytes) {
            alert(message);
            return (document.getElementById("picture").value = "");
          } else {
            self.setState({ picture: e.target.files[0] });
          }
        }}
      />
      <p> File size must be under 1MB!</p>
    </div>
  );
};

export default PictureInput;
