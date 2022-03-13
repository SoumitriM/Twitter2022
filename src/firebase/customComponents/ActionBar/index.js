export default function ActionBar() {
    // onChange={handleImageUpload}
    return (
        <div className="new-tweet-icons">
            <ul>
                <li><label for="file"><ion-icon name="image-outline"></ion-icon></label>
                    <input type="file" id="file" style={{ "display": "none" }} /></li>
                <li><ion-icon name="camera-outline"></ion-icon></li>
                <li><ion-icon name="happy-outline"></ion-icon></li>
            </ul>
        </div>
    );
}