// Style
import "../styles/UploadImage.css";

// Autre
import request from "superagent";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Dropzone from "react-dropzone";

function UploadImage({ imgList, setImgList, i, tailleTel }) {
  const CLOUDINARY_UPLOAD_PRESET = "LesRecettesDeSabine";
  const CLOUDINARY_UPLOAD_URL =
    "https://api.cloudinary.com/v1_1/lesrecettesdesabine/upload";

  const onImageDrop = (e) => {
    if (e.length > 1) {
      toast.error("1 seule image à la fois");
    } else if (
      e[0].type !== "image/jpeg" &&
      e[0].type !== "image/jpg" &&
      e[0].type !== "image/png"
    ) {
      toast.error("Uniquement les .jpeg, .jpg, .png sont acceptés");
    } else {
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", e[0]);
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        if (response.body.secure_url !== "") {
          let myList = [...imgList];
          myList[i] = response.body.secure_url;
          setImgList(myList);
        }
      });
    }
  };

  function deleteImg() {
    let myList = [...imgList];
    for (let j = i; j < myList.length - 1; j++) {
      myList[j] = myList[j + 1];
    }
    myList[4] = "";
    setImgList(myList);
  }

  return imgList[i] === "" ? (
    <div
      className="paquet_drop"
      style={{ width: tailleTel ? "350px" : "400px" }}
    >
      <Dropzone onDrop={(e) => onImageDrop(e)}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className="drop_img elements_centre colonne" {...getRootProps()}>
            <FontAwesomeIcon
              icon={faImage}
              size={"9x"}
              style={{ color: "#000000" }}
              onChange={onImageDrop}
            />
            <input {...getInputProps()} />
            <div className="gras elements_centre texte_taille_3">
              {isDragActive
                ? "Lâcher pour ajouter"
                : "Ajouter/Déposer une image"}
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  ) : (
    <div
      className="paquet_drop"
      style={{ width: tailleTel ? "350px" : "400px" }}
    >
      <Dropzone onDrop={(e) => onImageDrop(e)}>
        {({ getRootProps, getInputProps }) => (
          <div className="drop_img elements_centre" {...getRootProps()}>
            <img className="img_upload" alt={imgList[i]} src={imgList[i]} />
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
      <div
        className="drop_img_delete texte_taille_2 elements_centre gras"
        onClick={deleteImg}
      >
        X
      </div>
    </div>
  );
}

export default UploadImage;
