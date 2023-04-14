/**
 * 大文件分片上传
 * @param file 文件对象
 * @param url 上传地址
 * @param chunkSize 分片大小，默认为5MB
 * @param onProgress 上传进度回调函数
 * @returns Promise
 */
export function uploadLargeFile(file: File, url: string, chunkSize = 5 * 1024 * 1024, onProgress?: (progress: number) => void): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileSize = file.size;
    const chunks = Math.ceil(fileSize / chunkSize);
    let uploadedChunks = 0;
    let uploadedSize = 0;
    const uploadId = new Date().getTime();
    const fileName = file.name;
    const fileType = file.type;
    const fileLastModified = file.lastModified;
    const uploadChunks = async () => {
      const start = uploadedChunks * chunkSize;
      const end = Math.min(start + chunkSize, fileSize);
      const chunk = file.slice(start, end);
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('uploadId', uploadId);
      formData.append('fileName', fileName);
      formData.append('fileType', fileType);
      formData.append('fileLastModified', fileLastModified.toString());
      formData.append('chunkIndex', uploadedChunks.toString());
      formData.append('chunks', chunks.toString());
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            uploadedSize += progressEvent.loaded;
            const progress = Math.round((uploadedSize / fileSize) * 100);
            onProgress && onProgress(progress);
          }
        }
      });
      uploadedChunks++;
      if (uploadedChunks < chunks) {
        uploadChunks();
      } else {
        resolve(res);
      }
    };
    uploadChunks();
  });
}
