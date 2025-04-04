import React, {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from "react-router-dom";
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
  faCamera
} from '@fortawesome/free-solid-svg-icons';
import useUserStore from './user/useUserStore.js';
import socket from './lib/socket.js';
import {
  toast
} from 'react-hot-toast';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const {
    credentials,
    setCredentials
  } = useUserStore();
  const [url,
    setUrl] = useState();
  const [selectedImage,
    setSelectedImage] = useState(null);
  const [loading,
    setLoading] = useState(false);
  const [imageUploading,
    setImageUploading] = useState(false);
  const [isApplyingChanges,
    setIsApplyingChanges] = useState(false);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check image size
      if (file.size > 4 * 1024 * 1024) {
        toast.error('Image size exceeds 4MB. Please upload a smaller image.');
        return;
      }

      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        console.log('Image selected:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle apply changes
  const handleApplyChanges = () => {
    if (imageUploading || isApplyingChanges) {
      toast.error('An update is already in progress. Please wait...');
      return;
    }

    if (!selectedImage) {
      toast.error('Please select an image before applying changes.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newImageSrc = reader.result;

      // Check if the new image matches the stored image
      const storedImageSrc = sessionStorage.getItem('profileImage');
      if (storedImageSrc === newImageSrc) {
        toast.error('The selected image is already your current profile picture.');
        return;
      }

      // Store the new image in sessionStorage
      sessionStorage.setItem('profileImage', newImageSrc);

      setImageUploading(true);
      setIsApplyingChanges(true);

      // Emit the profile image to the server
      socket.emit('profileImageUpdate', {
        image: newImageSrc
      });
      setLoading(true);
      console.log('Image sent to socket:', newImageSrc);
    };
    reader.readAsDataURL(selectedImage);
  };

  useEffect(() => {
    // Read from global store
    setUrl(credentials.pr);

    // Listen for changes from the socket
    socket.on('prUrl', (response) => {
      setUrl(response.url);
      let cr = credentials;
      cr["pr"] = String(response.url);
      setCredentials(cr);
      setTimeout(() => {
        setLoading(false);
        setImageUploading(false);
        setIsApplyingChanges(false); // Reset flag after successful update
      }, 500);
    });

  }, [credentials.pr, setCredentials]);

  const logout = () => {
    localStorage.setItem("data", null);
    navigate("/", {
      replace: true
    });
    window.location.reload();
  };

  const deleteAccount = () => {
    localStorage.setItem("data", null);
    navigate("/", {
      replace: true
    });
    window.location.reload();
    socket.emit("DeleteAccount", credentials)
  }

  return (
    <div className="h-full w-full">
      <div className="overflow-hidden flex justify-center items-center mt-[10vh]">
        {/* Image Container */}
        {loading ? (
          <div className="skeleton w-[60vw] h-[60vw] rounded-full" />
        ): (
          <div className="relative">
            {/* Profile Image */}
            <img
            src={url}
            className="shadow w-[60vw] h-[60vw] rounded-full object-cover"
            alt="Profile"
            />

          {/* Camera Icon */}
          <div className="absolute flex items-center justify-center bottom-2 right-2 bg-white p-2 w-[10vw] h-[10vw] rounded-full shadow-md cursor-pointer">
            <label htmlFor="imageUpload" className="cursor-pointer">
              <FontAwesomeIcon icon={faCamera} className="text-gray-700 text-lg" />
              <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              />
          </label>
        </div>
      </div>
    )}
  </div>

  {/* Put this part before </body> tag */}
  <input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">Hello!</h3>
    <p className="py-4">
      Confirm to delete the account,
      This action cannot be undo
    </p>
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn" onClick={deleteAccount}>Confirm </label>
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
{/* Apply Changes Button */}
<div className="flex justify-center">
  <button
    onClick={handleApplyChanges}
    className="btn mt-2"
    disabled={imageUploading || isApplyingChanges}
    >
    Apply Changes
  </button>
</div>
<div className="flex flex-col mt-4 border p-3 shadow-md">
  <button className="btn bg-secondary" onClick={logout}>
    Log out
  </button>
  <label htmlFor="my_modal_6" className="btn bg-secondary">Delete this account</label>
</div>
</div>
);
};

export default ProfileUpdate;