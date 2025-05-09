import {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle,
  } from "react";
  import { useAvatarVersion } from "../../context/avatar-context";
  import "./Avatar.css";
  
  const Avatar = forwardRef(({ isEditing = false }, ref) => {
    const { avatarVersion } = useAvatarVersion();
  
    const [avatarBlobUrl, setAvatarBlobUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
  
    // Позволяет родителю получить выбранный файл
    useImperativeHandle(ref, () => ({
      getSelectedFile: () => selectedFile,
    }));
  
    // Загружаем аватар при изменении avatarVersion
    useEffect(() => {
      const fetchAvatar = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        try {
          const res = await fetch("http://localhost:8080/users/avatar", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to load avatar");
  
          const blob = await res.blob();
          const blobUrl = URL.createObjectURL(blob);
  
          if (avatarBlobUrl) URL.revokeObjectURL(avatarBlobUrl);
          setAvatarBlobUrl(blobUrl);
        } catch (err) {
          console.error("Error loading avatar:", err);
        }
      };
  
      fetchAvatar();
  
      return () => {
        if (avatarBlobUrl) URL.revokeObjectURL(avatarBlobUrl);
      };
    }, [avatarVersion]);
  
    useEffect(() => {
      return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
    }, [previewUrl]);
  
    const handleAvatarClick = () => {
      if (isEditing && fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
  
      const preview = URL.createObjectURL(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
  
      setSelectedFile(file);
      setPreviewUrl(preview);
    };
  
    return (
      <div className="avatar-container" onClick={handleAvatarClick}>
        {previewUrl || avatarBlobUrl ? (
          <img src={previewUrl || avatarBlobUrl} alt="avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">No Avatar</div>
        )}
  
        {isEditing && (
          <div className="avatar-overlay">
            <span className="avatar-icon">📷</span>
          </div>
        )}
  
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    );
  });
  
  export default Avatar;
  