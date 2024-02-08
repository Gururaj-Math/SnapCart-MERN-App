import { useEffect, useRef } from 'react';
import { Button } from 'antd';

const UploadWidget = (props: { buttonName: string; onUpload: (result: any) => void }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    // @ts-ignore
    cloudinaryRef.current = window.cloudinary;
    // @ts-ignore
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dao8fbqcc',
        uploadPreset: 'l8gjhkmj',
      },
      function (error: any, result: { event: string; info: any }) {
        if (!error && result && result.event === 'success') {
          console.log('result', result.info);
          props.onUpload(result.info);
        }
      }
    );
  }, []);

  return (
    <div>
      {/* @ts-ignore */}
      <Button onClick={() => widgetRef.current.open()}>{props.buttonName}</Button>
    </div>
  );
};

export default UploadWidget;