// import { useState } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import { slides } from "./data";
// import "yet-another-react-lightbox/styles.css";
// import {
//   Captions,
//   Download,
//   Zoom,
//   Thumbnails,
// } from "yet-another-react-lightbox/plugins";
// import "yet-another-react-lightbox/plugins/captions.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

// const ImageGallery = () => {
//   const [open, setOpen] = useState(false);
//   const preload = 10;
//   return (
//     <div className="imageGalleryArea">
//       <button onClick={() => setOpen(true)}>open lightbox</button>
//       <Lightbox
//         plugins={[Captions, Download, Zoom, Thumbnails]}
//         captions={{
//           showToggle: true,
//         }}
//         carousel={{ preload }}
//         open={open}
//         slides={slides}
//         close={() => setOpen(false)}
//       />
//     </div>
//   );
// };
// export default ImageGallery;
