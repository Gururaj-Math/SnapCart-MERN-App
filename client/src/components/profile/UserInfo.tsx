import { InfoCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const UserInfo = (props: {
   currentUser: any;
   renderSocialMediaIcon: (link: string) => React.FunctionComponentElement<any> | null;
}) => {
   return (
      <div className="p-4 border-2 rounded-md flex justify-between md:px-12 flex-col md:flex-row">
         <div>
            <h1 className="font-semibold text-gray-500 flex items-center gap-2">
               <span>
                  <InfoCircleOutlined />
               </span>
               Bio
            </h1>
            <p className="mb-2">{props.currentUser.bio}</p>
            <h1 className="font-semibold text-gray-500 flex items-center gap-2">
               <span>
                  <EnvironmentOutlined />
               </span>
               Location
            </h1>
            <p>{props.currentUser.location}</p>
         </div>
         <div className="flex flex-col items-start md:justify-center md:items-center md:px-4 gap-2">
            <h1 className="font-semibold text-gray-500 text-center">Social Links</h1>
            <div className="flex items-center gap-4">
               {props.currentUser.links
                  .filter((link: string) => link && typeof link === 'string')
                  .map((link: string, index: number) => (
                     <a href={link} key={index} target="_blank" rel="noopener noreferrer">
                        {props.renderSocialMediaIcon(link)}
                     </a>
                  ))}
            </div>
         </div>
      </div>
   );
};

export default UserInfo;
