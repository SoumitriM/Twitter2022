import TwitterButton from "../TwitterButton";
export default function ActionBar({onTweetBtnClick, onImageClick}) {
  // onChange={handleImageUpload}
  return (
    <div className="new-tweet-icons">
      <ul className="actionButtonLeft">
        <li style={{'position' : 'relative'}}> 
          <label style={{opacity: 1, 'position': 'absolute'}} ><ion-icon name="image-outline"></ion-icon></label>
          <input type="file" id="files" onChange={onImageClick} style={{opacity: 1, 'position': 'absolute', 'width' : '10px'}} />
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