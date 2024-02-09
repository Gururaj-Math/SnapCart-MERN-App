import { Modal, Button, Input } from 'antd';

const ShareProfileModal = (props: {
   shareModalVisible: boolean;
   setShareModalVisible: any;
   selectedPostId: string;
}) => {
   return (
      <Modal
         title="Share Post"
         open={props.shareModalVisible}
         onCancel={() => props.setShareModalVisible(false)}
         footer={[
            <Button key="close" onClick={() => props.setShareModalVisible(false)}>
               Close
            </Button>,
         ]}
      >
         <p>Share this post link: </p>
         <Input value={`${window.location.origin}/post/${props.selectedPostId}`} disabled={true} />
      </Modal>
   );
};

export default ShareProfileModal;
