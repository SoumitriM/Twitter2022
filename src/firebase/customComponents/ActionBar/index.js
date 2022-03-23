import TwitterButton from "../TwitterButton";
export default function ActionBar({onTweetBtnClick, onImageClick}) {
  // onChange={handleImageUpload}
  return (
    <div className="new-tweet-icons">
      <ul className="actionButtonLeft">
        <li>
          <label><ion-icon name="image-outline"></ion-icon></label>
          <input type="file" id="file" onChange={onImageClick} style={{ "display": "none" }} />
        </li>
        <li><ion-icon name="camera-outline"></ion-icon></li>
        <li><ion-icon name="happy-outline"></ion-icon></li>
      </ul>
      <div className="actionButtonRight">
        <TwitterButton onClick={onTweetBtnClick} label="Tweet" />
      </div>
    </div>
  );
}