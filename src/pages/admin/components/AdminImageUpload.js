import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { resolveAssetUrl } from "../../../utils/assetUrl";

function AdminImageUpload({ value, onChange, label = "Upload image" }) {
  const [localPreview, setLocalPreview] = useState("");
  const imageUrl = useMemo(() => {
    if (value instanceof File) return localPreview;
    return resolveAssetUrl(value);
  }, [localPreview, value]);

  useEffect(() => {
    if (!(value instanceof File)) {
      setLocalPreview("");
      return undefined;
    }

    const nextPreview = URL.createObjectURL(value);
    setLocalPreview(nextPreview);

    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  const handleBeforeUpload = (file) => {
    onChange?.(file);
    return false;
  };

  return (
    <div className="admin-image-upload">
      {imageUrl ? (
        <div className="admin-image-upload__preview">
          <Image src={imageUrl} alt="uploaded asset" />
        </div>
      ) : null}

      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
      >
        <button type="button" className="admin-upload-trigger">
          <PlusOutlined />
          <span>{label}</span>
        </button>
      </Upload>
    </div>
  );
}

export default AdminImageUpload;
