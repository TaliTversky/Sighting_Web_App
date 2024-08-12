// import ImageGallery from "../components/ImageGallery/ImageGallery";
import { StorageImage, StorageManager } from "@aws-amplify/ui-react-storage";

const Page1 = () => {
  return (
    <div>
      <StorageManager path="public/" maxFileCount={3} />

      {/* <ImageGallery /> */}
    </div>
  );
};

export default Page1;
