import { Card, Divider, Avatar } from 'antd';

const { Meta } = Card;

const NotesBoard = () => {
   return (
      <div className="min-h-90vh overflow-auto">
         <Card
            style={{
               overflow: 'auto',
               height: '100vh',
               position: 'fixed',
               right: 0,
               top: 0,
               bottom: 0,
               padding: 10,
               width: 400,
            }}
         >
            <Divider orientation="left">Notes</Divider>
            <div className="flex flex-col gap-2 items-center max-h-[18vw] overflow-auto">
               <Card style={{ width: 300 }}>
                  <Meta
                     avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                     title="Card title"
                     description="This is the description"
                  />
               </Card>
               <Card style={{ width: 300 }}>
                  <Meta
                     avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                     title="Card title"
                     description="This is the description"
                  />
               </Card>
            </div>
            <Divider orientation="left">Following</Divider>
            <div className="flex flex-col gap-2 items-center max-h-[15vw] overflow-auto">
               <Card style={{ width: 300 }}>
                  <Meta
                     avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                     title="Card title"
                     description="This is the description"
                  />
               </Card>
               <Card style={{ width: 300 }}>
                  <Meta
                     avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                     title="Card title"
                     description="This is the description"
                  />
               </Card>
            </div>
         </Card>
      </div>
   );
};

export default NotesBoard;
